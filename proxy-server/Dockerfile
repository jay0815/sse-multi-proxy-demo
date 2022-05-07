# 指定的一个基础镜像
FROM nginx:latest
# 工作目录
WORKDIR /etc/nginx
# copy package.json 到工作目录中
COPY nginx.conf /etc/nginx/nginx.conf
# 向外暴露3000端口
EXPOSE 80