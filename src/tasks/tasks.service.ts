import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import * as cheerio from 'cheerio';
import { House } from '../house/entities/house-entity';
import { User } from '../user/entities/user-entity';
import { HouseService } from '../house/house.service';
const puppeteer = require('puppeteer');

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private async getHouseInfo(targetUrl, containerElement) {
    const result_list = [];
    //打开一个浏览器
    const browser = await puppeteer.launch();
    // 打开一个页面puppeteer
    const page = await browser.newPage();
    await page.goto(targetUrl, {
      waitUntil: 'networkidle2',
    });
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await sleep(4000);
    async function autoScroll(page) {
      await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 50;
          var timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollTo(0, scrollHeight);
            clearInterval(timer);
            resolve('');
            // 平滑滚动
            // window.scrollBy(0, distance);
            // totalHeight += distance;

            // if (totalHeight >= scrollHeight) {
            //   clearInterval(timer);
            //   resolve('');
            // }
          }, 120);
        });
      });
    }
    let html = '';
    let $;
    /* 页面滚动方法 */
    let that = this;
    let previousNum = 0;
    async function scrollPage(num) {
      // 自动滚动页面
      that.logger.debug('滚动页面start');
      await autoScroll(page);
      that.logger.debug('滚动页面end');
      // 等待分页
      await sleep(2000);
      // 获取html
      html = await page.content();
      $ = cheerio.load(html);
      that.logger.debug(`当前数据条数: ${$(containerElement).length}`);
      that.logger.debug(`上次数据条数: ${previousNum}`);
      // 大于指定条数或者 与上一条数据一致
      if (
        $(containerElement).length >= num ||
        $(containerElement).length === previousNum
      ) {
        return $(containerElement);
      } else {
        previousNum = $(containerElement).length;
        return await scrollPage(num);
      }
    }
    let targetContainer = await scrollPage(50);
    // this.logger.debug(`获取数据条数: ${targetContainer.length}`);
    targetContainer.each(function () {
      const elem = $(this);
      const rentType = elem
        .find('.detail-hd__lt')
        .find('.tc-template__bg')
        .text();
      const username = elem.find('.detail-hd__lt').find('.username').text();
      const telphone = elem.find('.detail-hd__rt').find('a').attr('href');
      const content = elem.find('.detail-content').text();
      const tags = $('.detail-tags').children('span');
      const photoList = elem
        .find('.detail-pics')
        .find('.photo_list')
        .attr('value');
      const originTime = $('.detail-time').find('span[title]').attr('title');
      const time = $('.detail-time').find('span[title]').text();
      result_list.push({
        rentInfo: {
          type: rentType,
          username,
          telphone: (telphone || '').replace('tel:', ''),
        },
        houseInfo: {
          content,
          tags:
            tags.length > 0
              ? Array.from(tags).map((item) => $(item).text())
              : [],
          photoList: (photoList && photoList.split('|')) || [],
          originTime,
          time,
        },
      });
    });
    /* 关闭 puppeteer*/
    await browser.close();
    return result_list;
  }

  constructor(
    private readonly houseService: HouseService,
    private readonly connection: Connection,
  ) {}

  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the current second is 45');
  // }

  // @Cron('5 * * * * *')
  // async findHouse() {
  //   const targetUrl = [''];
  //   this.logger.debug('Called when the current second is 5');
  // }

  // @Interval(10000)
  async handleTimeout() {
    // 出租地址
    const rentUrl =
      'https://tcwx.aycjtc1.cn/plugin.php?id=tom_tongcheng&site=1&mod=list&model_id=4&type_id=10&cate_id=0&city_id=0&area_id=0&street_id=0&keyword=&ordertype=';
    let houseData = [];
    try {
      houseData = await this.getHouseInfo(rentUrl, '.tcline-item');
      // 截取前50条
      // houseData = houseData.slice(0, 50);
      if (Array.isArray(houseData)) {
        for (let i = 0; i < houseData.length; i++) {
          await this.createHouseInfo(houseData[i]);
        }
      }
    } catch (e) {
      console.log('e', e);
      this.logger.debug('获取数据失败');
    }
    this.logger.debug('Called every 3 seconds');
  }

  async createHouseInfo(createInfo: any) {
    const { rentInfo, houseInfo } = createInfo;
    const { content, photoList, tags, originTime } = houseInfo;

    const house = {
      content,
      photoList,
      tags,
      createTime: originTime,
      operator: rentInfo.username,
      updateTime: originTime,
    };

    const user = {
      username: rentInfo.username,
      telphone: rentInfo.telphone,
    };

    try {
      await this.houseService.create(house);
      this.logger.log(JSON.stringify(house), '插入house的数据');
    } catch (e) {
      console.log('e', e);
    }
  }
}
