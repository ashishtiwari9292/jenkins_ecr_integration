FROM public.ecr.aws/bitnami/node:18.20.3-debian-12-r2
RUN wget http://download.redis.io/redis-stable.tar.gz && \
    tar xvzf redis-stable.tar.gz && \
    cd redis-stable && \
    make && \
    mv src/redis-server /usr/bin/ && \
    cd .. && \
    rm -r redis-stable && \
    npm install -g concurrently   

EXPOSE 6379
WORKDIR /app
COPY package*.json /app/
RUN npm i
RUN npm install redis
COPY . /app
RUN npm run build
EXPOSE 3000
EXPOSE 6379
CMD concurrently "/usr/bin/redis-server --bind '0.0.0.0'" "sleep 5s; npm run start"
