# blue-friend-server



### 数据库迁移
> 数据库迁移提供了一种增量更新我们的数据库模式并使其保持与应用程序数据模型保持同步的方法，同时保留我们数据库的现有数据, 生产、运行和恢复迁移。
应用场景
- 迁移可以帮助我们重命名现有列，并维护我们以前的所有数据

第一步： 创建ormconfig.js文件
第二步：创建迁移文件

``` bash
npx typeorm migration:create -n 文件名称
```
该命令会在ormconfig.js中配置的目录下，生成一个新的迁移文件

迁移文件都有一个up和down方法
up: 我们要指示需要更改的内容以及如何更改
down: 我们要撤销或回滚任何更改的内容

第三步：build项目到dist目录

第四步：执行迁移命令

``` bash
npx typeorm migration:run
```

常见的迁移命令

``` bash
npx typeorm migration:revert 回滚
npx typeorm migration:run
npx typeorm migration:generate 自动生成
npx typeorm migration:create  
```


### 部署问题
- https://www.walkerjones.co/posts/nestjs-postgres-heroku
- https://medium.com/jason-read-code/%E4%B8%80%E6%AD%A5%E4%B8%80%E6%AD%A5%E5%B0%87-nestjs-%E9%83%A8%E7%BD%B2%E5%88%B0-heroku-7921438103a0