# Nginx Step-by-Step Console Configuration (Digital Ocean)

This guide provides the exact commands to run via SSH on your Digital Ocean droplet to route your domains correctly.

## 1. Install Nginx and SSL Tools
```bash
# Update system and install Nginx
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

## 2. Configure Nginx for your Domains
Create a new configuration file for your project:
```bash
sudo nano /etc/nginx/sites-available/meetlocal
```

Paste the following configuration (Right-click to paste in most terminals):
```nginx
# app.meetlocal.app (Main Hub)
server {
    listen 80;
    server_name app.meetlocal.app;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }

    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}

# meetlocal.app (Marketing Site)
server {
    listen 80;
    server_name meetlocal.app www.meetlocal.app;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
*Press `Ctrl+O`, `Enter`, then `Ctrl+X` to save.*

## 3. Enable the Configuration
```bash
# Link to enabled sites
sudo ln -s /etc/nginx/sites-available/meetlocal /etc/nginx/sites-enabled/

# Remove default config if present
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## 4. Enable SSL (HTTPS)
Certbot will automatically update your Nginx config:
```bash
sudo certbot --nginx -d meetlocal.app -d www.meetlocal.app -d app.meetlocal.app
```
Follow the prompts (enter email, agree to terms, choose "Redirect" if asked).

## 5. Verify and Start App
Ensure your Docker containers are running with the correct host port mapping:
```bash
docker compose up -d
```

---
**Note:** Ensure your DNS Settings in Digital Ocean point both `@` and `app` A-records to your Droplet IP.
