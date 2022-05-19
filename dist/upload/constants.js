"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticBaseUrl = void 0;
exports.staticBaseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4100/static/'
    : 'https://blue-friend-server.herokuapp.com/static/';
//# sourceMappingURL=constants.js.map