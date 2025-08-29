FROM node:22 AS base
WORKDIR /app
# Needed by some native deps on Alpine
RUN apt-get update && apt-get install -y 

# ---- deps layer (cached) ----
FROM base AS deps
WORKDIR /app

# Copy only manifests to maximize cache hits
COPY package.json package-lock.json* ./

# Install dependencies.
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else npm install; fi

# ---- dev runtime ----
FROM base AS dev
WORKDIR /app

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Improve file watching inside Docker (especially on Windows/Mac)
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true
# Let Next listen on all interfaces in the container
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Copy node_modules from deps image (code itself will be bind-mounted)
COPY --from=deps /app/node_modules ./node_modules
# Optional: if your dev scripts read package.json
COPY package.json ./

EXPOSE 3000
EXPOSE 9229

# Default: next dev
CMD ["npm", "run", "dev"]
