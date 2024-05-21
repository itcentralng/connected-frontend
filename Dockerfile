FROM node:latest as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set environment variable for the Vite application
ARG VITE_APP_API_URL


ENV VITE_APP_API_URL=$VITE_APP_API_URL

# Build the application
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Command to run the application
CMD ["serve", "-s", "dist"]

# Expose the port the app runs on
EXPOSE 3000