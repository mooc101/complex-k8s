FROM node:alpine as builder

WORKDIR '/app'

COPY ./package.json ./

RUN npm install

COPY . .

RUN ["npm", "run", "build"]

# /app/build will have the production html

FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html