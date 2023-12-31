# 使用 node 镜像
FROM node as builder

# 初始化工作目录
RUN mkdir -p /app/server
WORKDIR /app/server

# 复制 package.json
COPY package*.json /app/server/

# 准备 bcrypt 环境
# RUN npm install node-gyp node-pre-gyp

# 安装依赖
RUN npm install

# 复制文件
COPY . /app/server/

# 构建
RUN npm run build

# 新 container
FROM node

# 准备工作目录
RUN mkdir -p /app/server
WORKDIR /app/server

# 从上面容器复制目录到当前容器目录
COPY --from=builder /app/server /app/server

# 开启 Dev
CMD ["npm", "run", 'start:prod']
