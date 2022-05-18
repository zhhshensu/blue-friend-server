export default () => ({
  port: parseInt(process.env.PORT, 10) || 4100,
  db: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.NODE_ENV === 'development' ? true : false,
  },
  multerDest: process.env.MULTER_DEST,
});