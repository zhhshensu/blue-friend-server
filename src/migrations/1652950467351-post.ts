import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class post1652950467351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //  升级数据库
    return await queryRunner.createTable(
      new Table({
        name: 'post', // 表名
        columns: [
          //  表列
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar' },
          { name: 'content', type: 'text' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('post'); // 删除post表
  }
}
