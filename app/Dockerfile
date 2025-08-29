FROM node:18-slim
##Install NPM 
RUN apt-get update && apt-get install -y npm && rm -rf /var/lib/apt/lists/*
WORKDIR /app
#Test12

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]

