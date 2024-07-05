# TODO: use multi stage builds to have the lightest image possible (get rid of typescript that is not used at runtime)
# meaning run only the code in dist folder
# use docker step caching strateically to make builds faster (non changing steps first)

# Use the official Node.js image as a base image
# TODO: verify that required system dependencies for bcrypt are present
FROM node:22-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
# TODO: use CICD environment variables
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]