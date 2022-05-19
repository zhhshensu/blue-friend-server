export default () => ({
  port: parseInt(process.env.PORT, 10) || 4100,
  db: {
    url: process.env.DATABASE_URL || '', // Postgres specific connection credential options. Connection url where perform connection to
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.NODE_ENV === 'development' ? true : false,
    ssl: process.env.DATABASE_URL
      ? {
          rejectUnauthorized: false, // https://stackoverflow.com/questions/66086508/nestjs-typeormmodule-unable-to-connect-to-the-database
        }
      : false,
  },
  multerDest: process.env.MULTER_DEST,
});
