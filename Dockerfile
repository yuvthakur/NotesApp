# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the application
COPY . .

# Expose port 8080
EXPOSE 8080

# Set environment variable (optional but good practice)
ENV PORT=8080

# Start the app
CMD ["node", "app.js"]
