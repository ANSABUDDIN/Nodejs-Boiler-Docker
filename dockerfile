# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory to /app
# WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source from the src directory
COPY . .

# Expose port 8080 (adjust if your application uses a different one)
EXPOSE 8080

# Define the command to run your app
CMD ["node", "src/server.js"]
