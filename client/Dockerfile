# Use an official Node.js runtime as a parent image
FROM node:14

# Set environment variables (you may customize these)
ENV NODE_ENV production

# Create and set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY ./package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your React app will run on (e.g., 3000)
EXPOSE 3000

# Define the command to start your React app
CMD ["npm", "start"]
