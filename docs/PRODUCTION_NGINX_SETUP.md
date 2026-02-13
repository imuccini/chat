# Production Nginx Configuration for iOS Connectivity

## Overview
This configuration ensures the iOS app can connect to both the Next.js web app and NestJS API/WebSocket server through a single domain with proper SSL/TLS.

## Architecture
```
iOS App (capacitor://localhost)
    ↓
https://app.meetlocal.app
    ├── /                  → Next.js (localhost:3000)
    ├── /api               → NestJS API (localhost:3001)
    └── /socket.io         → NestJS WebSocket (localhost:3001)
```

## Nginx Configuration

### File: `/etc/nginx/sites-available/app.meetlocal.app`

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name app.meetlocal.app;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name app.meetlocal.app;

    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/app.meetlocal.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.meetlocal.app/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Max upload size (for image uploads)
    client_max_body_size 10M;

    # WebSocket timeout
    proxy_read_timeout 86400;
    proxy_send_timeout 86400;

    # Socket.IO WebSocket (MUST be before /api)
    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;

        # WebSocket headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Important for iOS Capacitor origin
        proxy_set_header Origin $http_origin;

        # Disable caching for WebSocket
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;

        # Timeouts for long-lived connections
        proxy_connect_timeout 7d;
        proxy_read_timeout 7d;
        proxy_send_timeout 7d;
    }

    # NestJS API (REST endpoints)
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;

        # WebSocket upgrade support (for potential polling fallback)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Important for iOS Capacitor origin
        proxy_set_header Origin $http_origin;

        proxy_cache_bypass $http_upgrade;
    }

    # Next.js Web App (handles BetterAuth, SSR, etc.)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        # WebSocket support for Next.js HMR (dev mode)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Important for iOS Capacitor origin
        proxy_set_header Origin $http_origin;

        proxy_cache_bypass $http_upgrade;

        # Next.js specific timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static file caching (if serving static assets directly)
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Setup Steps

### 1. Install Nginx
```bash
sudo apt update
sudo apt install nginx
```

### 2. Install Certbot for SSL
```bash
sudo apt install certbot python3-certbot-nginx
```

### 3. Create Nginx config
```bash
sudo nano /etc/nginx/sites-available/app.meetlocal.app
```
Paste the configuration above.

### 4. Enable the site
```bash
sudo ln -s /etc/nginx/sites-available/app.meetlocal.app /etc/nginx/sites-enabled/
```

### 5. Test Nginx configuration
```bash
sudo nginx -t
```

### 6. Obtain SSL certificate
```bash
sudo certbot --nginx -d app.meetlocal.app
```

### 7. Reload Nginx
```bash
sudo systemctl reload nginx
```

### 8. Verify auto-renewal
```bash
sudo certbot renew --dry-run
```

## Environment Variables for Production

Update your `.env` on the server:

```bash
# Production URLs (no port numbers)
BETTER_AUTH_URL=https://app.meetlocal.app
NEXT_PUBLIC_SERVER_URL=https://app.meetlocal.app

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/chat_db"

# Auth Secret (use a secure random string!)
BETTER_AUTH_SECRET="your-super-secret-production-key-here"

# Optional: Redis for Socket.IO scaling
REDIS_URL="redis://localhost:6379"
```

## Docker Considerations

If running in Docker, update your `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: ./apps/web
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SERVER_URL=https://app.meetlocal.app
      - BETTER_AUTH_URL=https://app.meetlocal.app
    depends_on:
      - db
      - api

  api:
    build: ./apps/api
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/chat_db
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: chat_db
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

## Testing iOS Connectivity

### 1. Test from Desktop Browser
```bash
# Open in Safari/Chrome
https://app.meetlocal.app
```

### 2. Test WebSocket Connection
```javascript
// Open browser console at https://app.meetlocal.app
const socket = io('https://app.meetlocal.app', {
  path: '/socket.io',
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('✅ Connected! Socket ID:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('❌ Connection error:', err.message);
});
```

### 3. Test from iOS Simulator
```bash
# Build Capacitor app
cd apps/web
npm run build
npx cap sync ios
npx cap open ios

# In Xcode, check Console logs for:
# "[ChatConfig] Native Platform Detected. SOCKET_URL: https://app.meetlocal.app"
```

### 4. Verify API Endpoint
```bash
# Test from command line
curl -v https://app.meetlocal.app/api/tenants

# Should return tenant data or 404 (not connection error)
```

## Troubleshooting

### WebSocket not connecting
1. Check nginx error logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

2. Verify Socket.IO is running:
   ```bash
   curl http://localhost:3001/socket.io/
   # Should return: {"code":0,"message":"Transport unknown"}
   ```

3. Check firewall:
   ```bash
   sudo ufw status
   sudo ufw allow 443/tcp
   ```

### iOS shows SSL errors
1. Verify certificate is valid:
   ```bash
   sudo certbot certificates
   ```

2. Test SSL configuration:
   ```bash
   openssl s_client -connect app.meetlocal.app:443 -servername app.meetlocal.app
   ```

### CORS errors from iOS
1. Verify NestJS CORS config includes `capacitor://localhost`
2. Check nginx passes `Origin` header:
   ```nginx
   proxy_set_header Origin $http_origin;
   ```

## Monitoring

### Check Nginx access logs
```bash
sudo tail -f /var/log/nginx/access.log
```

### Check NestJS logs
```bash
# If using PM2
pm2 logs api

# If using Docker
docker logs -f <api-container-name>
```

### Check Next.js logs
```bash
# If using PM2
pm2 logs web

# If using Docker
docker logs -f <web-container-name>
```

## Performance Optimization

### Enable Gzip Compression
```nginx
# Add to http block in /etc/nginx/nginx.conf
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
```

### Enable Nginx Caching (optional)
```nginx
# Add to http block
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m use_temp_path=off;

# In location /api
proxy_cache my_cache;
proxy_cache_valid 200 5m;
proxy_cache_methods GET HEAD;
```

## Security Checklist

- [ ] SSL certificate installed and auto-renewing
- [ ] HTTPS redirect enabled (HTTP → HTTPS)
- [ ] Security headers configured (HSTS, X-Frame-Options, etc.)
- [ ] Firewall rules configured (only 80, 443 open)
- [ ] Strong `BETTER_AUTH_SECRET` in production
- [ ] Database not exposed to public internet
- [ ] Redis (if used) password-protected
- [ ] Nginx access logs monitored
- [ ] Rate limiting configured (optional)

## Next Steps

1. Set up this Nginx configuration on your Digital Ocean droplet
2. Deploy your Docker containers
3. Test connectivity from iOS simulator
4. Test on physical iOS device
5. Monitor logs during initial deployment
