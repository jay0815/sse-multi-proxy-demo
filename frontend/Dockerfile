FROM node:16 as build-stage

RUN npm config set cache "/root/.cache/npm"

WORKDIR /app 

ADD . /app

RUN yarn

RUN yarn run build

FROM nginx:latest as nginx

COPY --from=build-stage /app/dist /etc/nginx/html

COPY --from=build-stage /app/conf /etc/nginx

# COPY --from=build-stage /app/dist /etc/nginx/nginx.conf

# COPY --from=build-stage /app/conf /usr/share/conf.d

EXPOSE 80

# CMD ["nginx", "-c","/usr/share/conf.d/nginx.conf","-g", "daemon off;"]

CMD ["nginx", "-g", "daemon off;"]