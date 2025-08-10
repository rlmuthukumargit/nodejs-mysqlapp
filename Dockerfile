FROM node:18
WORKDIR /app
#Test12

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]

