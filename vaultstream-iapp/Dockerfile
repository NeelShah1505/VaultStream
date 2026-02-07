FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source
COPY src/ ./src/

# Create input/output directories
RUN mkdir -p /iexec_in /iexec_out

# Set environment variables for iExec
ENV IEXEC_IN=/iexec_in
ENV IEXEC_OUT=/iexec_out

# Run the application
CMD ["node", "src/app.js"]
