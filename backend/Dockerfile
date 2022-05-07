# 指定的一个基础镜像
FROM node:latest
# 工作目录
WORKDIR /app/server
# copy 当前目录 到工作目录中
COPY . /app/server/
# 安装依赖
RUN npm install
# 编译 ts 为 js
RUN npm run build
# 拷贝当前目录的文件到工作目录中
# 如果有不需要忽略的文件，可以写在 .dockerignore 文件中，比如忽略 node_modules 文件夹
COPY . /app/server/
# 向外暴露8848端口
EXPOSE 8848
# 容器运行后执行的命令
CMD node dist/app.js