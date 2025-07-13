FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy .env file if needed
COPY .env ./

# Copy all source files
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./
COPY public ./public
COPY src ./src
COPY eslint.config.js ./
COPY README.md ./

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server binding to all interfaces (0.0.0.0)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
