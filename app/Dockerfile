# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Copy environment file if needed
COPY .env ./

# Install dependencies
RUN npm install

# Copy app source files and folders
COPY database.js ./
COPY jest-setup.js ./
COPY server.js ./
COPY utils.js ./
COPY routes ./routes
COPY tests ./tests

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
