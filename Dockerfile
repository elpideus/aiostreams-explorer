# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the frontend source and build it
COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine
WORKDIR /app

# Copy built frontend from builder to ./public
COPY --from=builder /app/dist ./public

# Copy backend source and production dependencies
COPY api ./api
COPY package*.json ./
RUN npm ci --only=production

# Expose the port the app runs on
EXPOSE 3000

# Create an entrypoint script that injects runtime environment variables
RUN echo '#!/bin/sh' > /entrypoint.sh && \
    echo 'echo "window.__TMDB_KEY__ = \"${TMDB_KEY}\";" > /app/public/config.js' >> /entrypoint.sh && \
    echo 'node /app/api/index.js' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]