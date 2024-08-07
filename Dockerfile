FROM public.ecr.aws/bitnami/node:18.20.3-debian-12-r2
RUN  npm install -g concurrently   

EXPOSE 6379
WORKDIR /app
COPY package*.json /app/
RUN npm i
COPY . /app
RUN npm run build
EXPOSE 3000
CMD concurrently "npm run start"
