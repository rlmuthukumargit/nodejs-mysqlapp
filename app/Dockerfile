# Use official Node.js 22 slim image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Install npm (and optional build tools if needed)
RUN apt update && apt install -y npm && rm -rf /var/lib/apt/lists/*

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose application port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
