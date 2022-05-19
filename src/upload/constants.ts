export const staticBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4100/static/'
    : 'https://blue-friend-server.herokuapp.com/static/';
