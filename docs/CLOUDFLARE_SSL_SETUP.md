# Cloudflare Flexible SSL Configuration for iOS Connectivity

## Architecture Overview

```
iOS App (capacitor://localhost)
    ↓ HTTPS (wss://)
Cloudflare Edge (SSL Termination)
    ↓ HTTP (ws://)
Your Digital Ocean Server (Nginx on port 80)
    ↓
Next.js (port 3000) + NestJS (port 3001)
```

## Important: Cloudflare Flexible SSL

You're using **Flexible SSL**, which means:
- ✅ Client → Cloudflare: **HTTPS/WSS** (encrypted)
- ⚠️ Cloudflare → Your Server: **HTTP/WS** (unencrypted)

This is **acceptable for development/testing** but:
- 🔴 **NOT recommended for production** (traffic between Cloudflare and your server is unencrypted)
- ✅ **Better option**: Use Cloudflare **Full SSL** or **Full SSL (Strict)** with Let's Encrypt on your server

However, since you're using Flexible SSL, your Nginx config should **NOT have SSL certificates** and should **only listen on port 80**.

## Correct Nginx Configuration for Cloudflare Flexible SSL

```nginx
# ============================================================================
# Nginx Configuration for app.meetlocal.app (Cloudflare Flexible SSL)
# Port 80 only - Cloudflare handles SSL termination
# ============================================================================

# WebSocket upgrade mapping
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
    listen [::]:80;
    server_name app.meetlocal.app;

    # ========================================================================
    # General Settings
    # ========================================================================
    client_max_body_size 10M;  # Max upload size for images
    proxy_read_timeout 86400;   # 24 hours for long-lived connections
    proxy_send_timeout 86400;

    # ========================================================================
    # Cloudflare Real IP Configuration
    # CRITICAL: Get real client IP from Cloudflare headers
    # ========================================================================
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 131.0.72.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    set_real_ip_from 2400:cb00::/32;
    set_real_ip_from 2606:4700::/32;
    set_real_ip_from 2803:f800::/32;
    set_real_ip_from 2405:b500::/32;
    set_real_ip_from 2405:8100::/32;
    set_real_ip_from 2c0f:f248::/32;
    set_real_ip_from 2a06:98c0::/29;

    real_ip_header CF-Connecting-IP;
    real_ip_recursive on;

    # ========================================================================
    # Location Blocks (ORDER MATTERS!)
    # ========================================================================

    # 1. Socket.IO WebSocket (MUST BE FIRST - most specific)
    # Cloudflare sends: wss://app.meetlocal.app/socket.io/
    # Nginx receives: ws://app.meetlocal.app/socket.io/ (port 80)
    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;

        # WebSocket headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # CRITICAL: Cloudflare sends https, but we're on http
        # Tell NestJS the original protocol was HTTPS
        proxy_set_header X-Forwarded-Proto https;

        # CRITICAL: Pass origin header for CORS (Capacitor sends capacitor://localhost)
        proxy_set_header Origin $http_origin;

        # Cloudflare-specific headers
        proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
        proxy_set_header CF-RAY $http_cf_ray;

        # Disable buffering for WebSocket
        proxy_buffering off;
        proxy_cache_bypass $http_upgrade;

        # Timeouts for long-lived WebSocket connections
        # 1 hour is sufficient - Socket.IO has its own heartbeat mechanism
        proxy_connect_timeout 3600s;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }

    # 2. Next.js API Routes (Port 3000)
    # Handles /api/auth, /api/debug-session, /api/admin, etc.
    location ~ ^/api/(auth|debug-session|admin|validate-nas|tenants/[^/]+/feedback) {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        # WebSocket support (for potential Next.js HMR)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # CRITICAL: Tell Next.js the original protocol was HTTPS
        proxy_set_header X-Forwarded-Proto https;

        # CRITICAL: Pass origin header for CORS
        proxy_set_header Origin $http_origin;

        # Cloudflare-specific headers
        proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;

        proxy_cache_bypass $http_upgrade;
    }

    # 3. NestJS API (Port 3001)
    # Handles /api/tenants, /api/messages, etc.
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;

        # WebSocket upgrade support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # CRITICAL: Tell NestJS the original protocol was HTTPS
        proxy_set_header X-Forwarded-Proto https;

        # CRITICAL: Pass origin header for CORS
        proxy_set_header Origin $http_origin;

        # Cloudflare-specific headers
        proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;

        proxy_cache_bypass $http_upgrade;
    }

    # 4. Next.js Static Assets (with caching)
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp)$ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;

        # Let Cloudflare handle caching
    }

    # 5. Next.js Main App (MUST BE LAST - catch-all)
    # Handles /, /[slug], and all other routes
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

        # CRITICAL: Tell Next.js the original protocol was HTTPS
        proxy_set_header X-Forwarded-Proto https;

        # CRITICAL: Pass origin header for CORS
        proxy_set_header Origin $http_origin;

        # Cloudflare-specific headers
        proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;

        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

# ============================================================================
# Marketing Site (meetlocal.app)
# ============================================================================
server {
    listen 80;
    listen [::]:80;
    server_name meetlocal.app www.meetlocal.app;

    # Cloudflare Real IP
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 131.0.72.0/22;
    real_ip_header CF-Connecting-IP;
    real_ip_recursive on;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Cloudflare Configuration

### DNS Settings
```
Type    Name    Content                 Proxy Status
A       app     <Your Server IP>        Proxied (orange cloud)
A       @       <Your Server IP>        Proxied (orange cloud)
CNAME   www     meetlocal.app           Proxied (orange cloud)
```

### SSL/TLS Settings
1. Go to **SSL/TLS** → **Overview**
2. Set encryption mode to:
   - **Flexible** (current - HTTP to origin)
   - OR **Full** (recommended - requires SSL on your server)

### WebSocket Settings
1. Go to **Network**
2. Enable **WebSockets**: ON ✅

### Firewall Rules (Optional but Recommended)
Add a firewall rule to allow only Cloudflare IPs to connect to your origin server:

```bash
# On your Digital Ocean server
sudo ufw allow from 173.245.48.0/20
sudo ufw allow from 103.21.244.0/22
sudo ufw allow from 103.22.200.0/22
sudo ufw allow from 103.31.4.0/22
sudo ufw allow from 141.101.64.0/18
sudo ufw allow from 108.162.192.0/18
sudo ufw allow from 190.93.240.0/20
sudo ufw allow from 188.114.96.0/20
sudo ufw allow from 197.234.240.0/22
sudo ufw allow from 198.41.128.0/17
sudo ufw allow from 162.158.0.0/15
sudo ufw allow from 104.16.0.0/13
sudo ufw allow from 104.24.0.0/14
sudo ufw allow from 172.64.0.0/13
sudo ufw allow from 131.0.72.0/22
sudo ufw deny 80
sudo ufw deny 443
```

## iOS App Configuration

Your iOS app will connect to:
- **Web App**: `https://app.meetlocal.app`
- **API**: `https://app.meetlocal.app/api`
- **WebSocket**: `wss://app.meetlocal.app/socket.io/`

Cloudflare automatically upgrades HTTP to HTTPS, so your app will always use secure connections.

## Testing

### 1. Test WebSocket from Browser Console
```javascript
// Go to https://app.meetlocal.app
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

### 2. Test API Endpoint
```bash
curl -v https://app.meetlocal.app/api/tenants
```

### 3. Test from iOS
Build and run your app. Check Xcode console for:
```
[ChatConfig] Native Platform Detected. SOCKET_URL: https://app.meetlocal.app
[Socket] Connected! Socket ID: xxx
```

## Known Issues with Cloudflare Flexible SSL

### Issue 1: Infinite Redirect Loop
**Symptom**: Page keeps redirecting
**Cause**: Your app tries to force HTTPS redirect, but Cloudflare already handles it
**Solution**: Disable HTTPS redirect in your app, let Cloudflare handle it

### Issue 2: Mixed Content Warnings
**Symptom**: Browser warns about insecure content
**Cause**: App tries to load HTTP resources on HTTPS page
**Solution**: Ensure all assets use relative paths or HTTPS

### Issue 3: WebSocket Connection Fails
**Symptom**: Socket.io falls back to polling or fails to connect
**Cause**: Cloudflare WebSocket support not enabled
**Solution**: Enable WebSockets in Cloudflare dashboard (Network settings)

## Upgrading to Full SSL (Recommended)

For production, upgrade to **Full SSL** or **Full SSL (Strict)**:

### Option 1: Full SSL with Self-Signed Certificate
```bash
# Generate self-signed cert
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/nginx-selfsigned.key \
  -out /etc/ssl/certs/nginx-selfsigned.crt

# Update nginx to listen on 443
# Then in Cloudflare: SSL/TLS → Full
```

### Option 2: Full SSL (Strict) with Let's Encrypt
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Temporarily disable Cloudflare proxy (set to DNS only)
# Get certificate
sudo certbot --nginx -d app.meetlocal.app

# Re-enable Cloudflare proxy
# In Cloudflare: SSL/TLS → Full (Strict)
```

## Environment Variables

Your `.env` should already be correct:
```bash
BETTER_AUTH_URL=https://app.meetlocal.app
NEXT_PUBLIC_SERVER_URL=https://app.meetlocal.app
```

## Summary Checklist

- [ ] Nginx listening on port 80 only (no SSL config)
- [ ] Cloudflare DNS proxied (orange cloud)
- [ ] Cloudflare SSL/TLS set to Flexible
- [ ] Cloudflare WebSockets enabled
- [ ] Nginx config includes `X-Forwarded-Proto: https` header
- [ ] Nginx config includes Cloudflare real IP ranges
- [ ] iOS app using `https://app.meetlocal.app` in `.env`
- [ ] Test WebSocket connection from browser
- [ ] Test API endpoints with curl
- [ ] Test iOS app in simulator
- [ ] Test iOS app on physical device

## Debugging

### Check Nginx logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Check if request reached your server
```bash
# Should see Cloudflare IP, not client IP
sudo tail -f /var/log/nginx/access.log | grep "socket.io"
```

### Verify Cloudflare is working
```bash
curl -I https://app.meetlocal.app
# Should see: cf-ray header
```

### Test WebSocket through Cloudflare
```bash
# Install websocat
cargo install websocat

# Test connection
websocat wss://app.meetlocal.app/socket.io/\?EIO\=4\&transport\=websocket
```
