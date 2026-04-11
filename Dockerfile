# Use lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy full project
COPY . .

# App runs on port 8080
EXPOSE 8080

# Environment variable
ENV PORT=8080

# Start the app (your entry file)
CMD ["node", "index.js"]
