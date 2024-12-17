# Stage 1: Build
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package manager files
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the project
COPY . .

# Build the project
RUN pnpm run build

# Stage 2: Production
FROM nginx:alpine

# Copy build output to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
