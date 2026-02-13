# Nginx Configuration Update Guide

## 🎯 Current Situation
- ✅ Web and Android working in localhost and production
- ✅ Cloudflare Flexible SSL handling encryption
- ✅ No SSL certificates needed on droplet

## ⚠️ What Needs to be Updated

Your current nginx config is mostly correct, but needs **three critical additions**:

### 1. **Fix WebSocket Timeout (CRITICAL)**

**Your current config**:
```nginx
location /socket.io/ {
    # ... headers ...
    # MISSING: explicit timeouts
}
```

**What to add**:
```nginx
location /socket.io/ {
    # ... existing headers ...

    # ADD THESE LINES:
    # 1 hour timeout (not 7 days!)
    # Socket.IO has its own heartbeat mechanism
    proxy_connect_timeout 3600s;
    proxy_read_timeout 3600s;
    proxy_send_timeout 3600s;
}
```

**Why**:
- 7-day timeout can exhaust file descriptors with "ghost" connections
- Socket.IO has ping/pong heartbeat, doesn't need proxy to hold connection
- 1 hour is industry standard for WebSocket proxies

---

### 2. **Add Critical CORS Headers (CRITICAL for iOS/Android)**

**What to add to ALL location blocks**:
```nginx
# CRITICAL: Tell backend the original protocol was HTTPS (Cloudflare terminates SSL)
proxy_set_header X-Forwarded-Proto https;

# CRITICAL: Pass origin header for CORS (Capacitor sends capacitor://localhost)
proxy_set_header Origin $http_origin;

# Cloudflare-specific headers (get real client IP)
proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
```

**Why**:
- iOS/Android Capacitor apps send `Origin: capacitor://localhost`
- Without `X-Forwarded-Proto`, BetterAuth generates HTTP URLs instead of HTTPS
- Without `Origin` header, NestJS CORS will reject mobile requests

---

### 3. **Add Cloudflare Real IP Detection (Important for Security)**

**What to add at the top of your server block**:
```nginx
server {
    listen 80;
    server_name app.meetlocal.app;

    # ADD THESE LINES:
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

    # ... rest of config
}
```

**Why**:
- Without this, your logs show Cloudflare's IP, not the real client
- Rate limiting won't work correctly
- Security rules based on IP won't work

---

## 📋 Step-by-Step Update Process

### Step 1: Backup Current Config
```bash
# On your Digital Ocean droplet
sudo cp /etc/nginx/sites-available/app.meetlocal.app /etc/nginx/sites-available/app.meetlocal.app.backup.$(date +%Y%m%d)
```

### Step 2: Compare Your Config with Production Config
```bash
# View your current config
sudo cat /etc/nginx/sites-available/app.meetlocal.app

# Compare with the production config provided in:
# docs/NGINX_CONFIG_PRODUCTION.conf
```

### Step 3: Apply Updates

**Option A: Manual Update (Safer)**
```bash
# Edit your config
sudo nano /etc/nginx/sites-available/app.meetlocal.app

# Add the three changes listed above
# Save and exit (Ctrl+X, Y, Enter)
```

**Option B: Replace Entire Config (Faster)**
```bash
# Only if you're confident!
sudo nano /etc/nginx/sites-available/app.meetlocal.app
# Delete all content
# Paste content from docs/NGINX_CONFIG_PRODUCTION.conf
# Save and exit
```

### Step 4: Test Configuration
```bash
# Test for syntax errors
sudo nginx -t

# Expected output:
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Step 5: Apply Changes
```bash
# Reload nginx (zero downtime)
sudo systemctl reload nginx

# Or restart if reload fails
sudo systemctl restart nginx
```

### Step 6: Verify Changes
```bash
# Check if nginx is running
sudo systemctl status nginx

# Should show: active (running)
```

---

## 🧪 Testing After Update

### Test 1: WebSocket Connection
```bash
# From your local machine
curl -v https://app.meetlocal.app/socket.io/

# Expected response:
# {"code":0,"message":"Transport unknown"}
```

### Test 2: API Endpoint
```bash
# Test NestJS API
curl -v https://app.meetlocal.app/api/tenants

# Should return tenant data (not connection error)
```

### Test 3: Headers are Passed Correctly
```bash
# Check nginx logs
sudo tail -f /var/log/nginx/app_access.log

# You should see real client IPs, not Cloudflare IPs (173.x.x.x, etc.)
```

### Test 4: iOS App Connection
1. Build and run iOS app
2. Check Xcode console for:
   ```
   [Socket] Connected! Socket ID: xxx
   [joinTenant] Joining tenant...
   ```
3. Verify no CORS errors

---

## 🔍 Quick Diff: Your Current vs. Production Config

### Location: `/socket.io/`

**BEFORE (Your Current)**:
```nginx
location /socket.io/ {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header Host $host;
    # MISSING: timeouts, X-Forwarded-Proto, Origin, CF headers
}
```

**AFTER (Production)**:
```nginx
location /socket.io/ {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    # ADDED: Critical headers
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header Origin $http_origin;
    proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
    proxy_set_header CF-RAY $http_cf_ray;

    proxy_buffering off;
    proxy_cache_bypass $http_upgrade;

    # ADDED: Timeouts (1 hour, not 7 days!)
    proxy_connect_timeout 3600s;
    proxy_read_timeout 3600s;
    proxy_send_timeout 3600s;
}
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting to Test First
```bash
# WRONG:
sudo systemctl reload nginx  # Without testing!

# RIGHT:
sudo nginx -t && sudo systemctl reload nginx
```

### ❌ Mistake 2: Not Adding Headers to ALL Locations
The critical headers must be in:
- `/socket.io/`
- `/api/(auth|debug-session|...)`
- `/api/`
- `/` (main app)

### ❌ Mistake 3: Using 7-Day Timeout
```nginx
# WRONG:
proxy_read_timeout 7d;

# RIGHT:
proxy_read_timeout 3600s;  # 1 hour
```

---

## 📊 Verification Checklist

After applying changes, verify:

- [ ] Nginx config test passes: `sudo nginx -t`
- [ ] Nginx reloaded successfully: `sudo systemctl reload nginx`
- [ ] Nginx is running: `sudo systemctl status nginx`
- [ ] WebSocket endpoint responds: `curl https://app.meetlocal.app/socket.io/`
- [ ] API endpoint responds: `curl https://app.meetlocal.app/api/tenants`
- [ ] Web app loads in browser: `https://app.meetlocal.app`
- [ ] iOS app connects (check Xcode console)
- [ ] Android app connects
- [ ] Real client IPs appear in logs (not Cloudflare IPs)
- [ ] No CORS errors in browser console
- [ ] WebSocket stays connected for > 5 minutes

---

## 🐛 Troubleshooting

### Issue: Nginx test fails
```bash
sudo nginx -t
# Shows error

# Solution:
# 1. Check syntax carefully (missing semicolon?)
# 2. Restore backup: sudo cp /etc/nginx/sites-available/app.meetlocal.app.backup.* /etc/nginx/sites-available/app.meetlocal.app
# 3. Try again
```

### Issue: Nginx won't reload
```bash
sudo systemctl reload nginx
# Fails

# Solution:
# Check error logs
sudo journalctl -u nginx -n 50

# Common issues:
# - Port 80 already in use
# - Syntax error in config
```

### Issue: WebSocket still not working
```bash
# Check if request reaches nginx
sudo tail -f /var/log/nginx/app_access.log | grep socket.io

# Check if backend is running
curl http://localhost:3001/socket.io/

# Check NestJS logs
docker-compose logs -f api | grep Socket
```

---

## 🎯 Summary

**Minimum required changes**:
1. ✅ Add 1-hour timeout to `/socket.io/` location
2. ✅ Add `X-Forwarded-Proto: https` to ALL locations
3. ✅ Add `Origin: $http_origin` to ALL locations
4. ✅ Add Cloudflare real IP detection at top of server block

**Estimated time**: 10 minutes

**Downtime**: Zero (if using `reload` instead of `restart`)

**Complete config reference**: `docs/NGINX_CONFIG_PRODUCTION.conf`

---

**Last Updated**: 2026-02-13
**Tested With**: Cloudflare Flexible SSL, Next.js 16, NestJS 11, Socket.IO 4.x
