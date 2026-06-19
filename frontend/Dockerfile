# Stage 1: Build Tailwind CSS
FROM node:18-alpine AS builder

WORKDIR /app

# Install packages
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Run the Tailwind compiler to generate output.css
RUN npx @tailwindcss/cli -i ./css/style.css -o ./css/output.css

# Stage 2: Serve static files with Nginx
FROM nginx:alpine

# Copy the custom frontend files from the builder stage
COPY --from=builder /app /usr/share/nginx/html

# Apply custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
