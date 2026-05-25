# ============================================================
# ShopLive — Multi-Stage Dockerfile
# ============================================================
# Stage 1: Build both versions of the React app
# Stage 2: Serve with nginx on port 8080
#
# PORTABILITY TESTING NOTE:
# This Dockerfile ensures the app runs identically on any machine
# that has Docker installed — regardless of OS, Node version, or
# local npm configuration. This is the core value of containerisation.
# ============================================================

# ── Stage 1: Build ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Build Version A (Broken Mobile)
COPY version-a/package*.json ./version-a/
RUN cd version-a && npm ci --silent

COPY version-a/ ./version-a/
RUN cd version-a && npm run build

# Build Version B (Fixed Responsive)
COPY version-b/package*.json ./version-b/
RUN cd version-b && npm ci --silent

COPY version-b/ ./version-b/
RUN cd version-b && npm run build

# ── Stage 2: Serve ─────────────────────────────────────────
FROM nginx:alpine AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built apps into nginx html directory
COPY --from=builder /app/version-a/dist /usr/share/nginx/html/version-a
COPY --from=builder /app/version-b/dist /usr/share/nginx/html/version-b

# Copy landing page and report page
COPY landing/index.html /usr/share/nginx/html/index.html
COPY landing/report.html /usr/share/nginx/html/report.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
