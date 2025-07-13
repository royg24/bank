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
COPY server.js ./
COPY errorHandler.js ./
COPY Validator ./Validator
COPY Controllers ./Controllers
COPY Routes ./Routes
COPY utils ./utils
COPY tests ./tests

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
