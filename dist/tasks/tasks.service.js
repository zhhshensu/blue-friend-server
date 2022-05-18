"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const cheerio = require("cheerio");
const house_service_1 = require("../house/house.service");
const puppeteer = require('puppeteer');
let TasksService = TasksService_1 = class TasksService {
    constructor(houseService, connection) {
        this.houseService = houseService;
        this.connection = connection;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    async getHouseInfo(targetUrl, containerElement) {
        const result_list = [];
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(targetUrl, {
            waitUntil: 'networkidle2',
        });
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
                    }, 120);
                });
            });
        }
        let html = '';
        let $;
        let that = this;
        let previousNum = 0;
        async function scrollPage(num) {
            that.logger.debug('滚动页面start');
            await autoScroll(page);
            that.logger.debug('滚动页面end');
            await sleep(2000);
            html = await page.content();
            $ = cheerio.load(html);
            that.logger.debug(`当前数据条数: ${$(containerElement).length}`);
            that.logger.debug(`上次数据条数: ${previousNum}`);
            if ($(containerElement).length >= num ||
                $(containerElement).length === previousNum) {
                return $(containerElement);
            }
            else {
                previousNum = $(containerElement).length;
                return await scrollPage(num);
            }
        }
        let targetContainer = await scrollPage(50);
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
                    tags: tags.length > 0
                        ? Array.from(tags).map((item) => $(item).text())
                        : [],
                    photoList: (photoList && photoList.split('|')) || [],
                    originTime,
                    time,
                },
            });
        });
        await browser.close();
        return result_list;
    }
    async handleTimeout() {
        const rentUrl = 'https://tcwx.aycjtc1.cn/plugin.php?id=tom_tongcheng&site=1&mod=list&model_id=4&type_id=10&cate_id=0&city_id=0&area_id=0&street_id=0&keyword=&ordertype=';
        let houseData = [];
        try {
            houseData = await this.getHouseInfo(rentUrl, '.tcline-item');
            if (Array.isArray(houseData)) {
                for (let i = 0; i < houseData.length; i++) {
                    await this.createHouseInfo(houseData[i]);
                }
            }
        }
        catch (e) {
            console.log('e', e);
            this.logger.debug('获取数据失败');
        }
        this.logger.debug('Called every 3 seconds');
    }
    async createHouseInfo(createInfo) {
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
        }
        catch (e) {
            console.log('e', e);
        }
    }
};
TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [house_service_1.HouseService,
        typeorm_1.Connection])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map