<<<<<<< HEAD
# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 3000

# Define environment variables (optional fallback, real ones from .env)
ENV PORT=3000

# Start the server
=======
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
>>>>>>> master
CMD ["npm", "start"]
