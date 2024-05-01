# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /meow/www/invalsia

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npx next build

# Install PM2 globally
RUN npm install -g pm2

# Expose the port
EXPOSE 8010

# Start the app using PM2
CMD ["npx", "next", "start", "-p", "8010"]
