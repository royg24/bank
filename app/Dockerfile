# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./ tsconfig.json ./

# Copy environment file if needed
COPY .env ./

# Install dependencies
RUN npm install

# Copy app source files and folders
COPY database.ts ./
COPY server.ts ./
COPY errorHandler.ts ./
COPY Validator ./Validator
COPY Controllers ./Controllers
COPY Routes ./Routes
COPY utils ./utils

# Compile TypeScript to JS in dist/
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/server.js"]
