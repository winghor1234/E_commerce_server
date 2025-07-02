FROM node:lts-alpine
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install 
# Copy the rest of the application code
COPY . .
# Container port exposed
EXPOSE 8888

# Start the application
CMD ["npm", "start"]