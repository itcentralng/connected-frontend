# build environment
FROM node:latest as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN yarn install
COPY . ./

# set env
ARG VITE_APP_API_URL
ENV VITE_APP_API_URL=$VITE_APP_API_URL


RUN echo 'VITE_APP_API_URL = '$VITE_APP_API_URL > .env.production

# run build
RUN yarn build


# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# new
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]