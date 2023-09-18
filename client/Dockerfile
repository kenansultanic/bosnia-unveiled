# Use the official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your frontend code into the container
COPY . .

# Build your React app
RUN npm run build

# Expose the port your React app will run on (e.g., 3000)
EXPOSE 3000

# Define the command to start your React app
CMD ["npm", "start"]
