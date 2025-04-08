# Use Node.js LTS version
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .


# Copy the rest of the app
COPY . .



# Serve the built frontend using a simple static server
CMD ["npx", "serve", "-s", "build"]

# Expose the port (React default is 3000)
EXPOSE 3000
