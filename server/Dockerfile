# Multi-stage build for NestJS backend
FROM node:18-alpine AS base

# Install Python and required packages for the drug API
RUN apk add --no-cache python3 py3-pip
RUN pip3 install requests

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY server/ .

# Build the NestJS application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy Python script
COPY server/src/drug/pharmai_data_simple.py ./dist/drug/

# Create non-root user
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs

USER nestjs

EXPOSE 4000

CMD ["node", "dist/main.js"] 