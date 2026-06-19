FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
