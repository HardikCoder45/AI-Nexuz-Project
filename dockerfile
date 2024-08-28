# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install a lightweight web server to serve the static files
RUN npm install -g serve

# Set the command to serve the build output
CMD ["serve", "-s", "build"]

# Expose port 3000 to the outside world
EXPOSE 3000
# Use the official Node.js image as the base image
 