# Deployment Guide for Digital Ocean

This app uses a **Custom Next.js Server** (`server.js`) with Socket.IO and **PostgreSQL**.
The recommended deployment method is via **Docker** on Digital Ocean's App Platform or a Droplet.

## 1. Prerequisites
- **Digital Ocean Account**.
- **GitHub Repository** containing this project.
- **Database**: A PostgreSQL database (Managed DO Database or one inside the Droplet).

## 2. Option A: Digital Ocean App Platform (Easiest)
The App Platform handles building and running the container automatically.

1.  **Create App**: Go to Digital Ocean Console -> Apps -> Create App.
2.  **Source**: Select "GitHub" and choose your repository.
3.  **Resources**:
    - **Service**: It should detect the `Dockerfile`. Use it.
    - **Port**: 3000 (HTTP).
4.  **Environment Variables**:
    Add the following variables in the configuration step:
    - `DATABASE_URL`: `postgresql://user:pass@host:port/db?sslmode=require` (Connection string to your Managed DB)
    - `BETTER_AUTH_SECRET`: `(Generate a secure random string)`
    - `BETTER_AUTH_URL`: `${APP_URL}` (Use the provided system variable or your domain)
    - `NEXT_PUBLIC_SERVER_URL`: `${APP_URL}` (Same as Auth URL, ensures API/Sockets connect correctly)
5.  **Database**:
    - You can add a "Database" component to the App during creation (Dev Database is cheap, ~$7/mo).
    - If you do this, DO automatically injects `DATABASE_URL`.
6.  **Deploy**: Click Launch.

## 3. Option B: Digital Ocean Droplet (VPS)
If you prefer managing a linux server (Ubuntu) with Docker Compose.

1.  **Create Droplet**: Ubuntu 22.04 or 24.04 (minimum 1GB RAM recommended).
2.  **SSH into Droplet**: `ssh root@your_droplet_ip`
3.  **Install Docker & Compose**:
    ```bash
    apt update
    apt install docker.io docker-compose -y
    ```
4.  **Clone Repo**:
    ```bash
    git clone https://github.com/your/repo.git /app
    cd /app
    ```
5.  **Setup Environment**:
    Create `.env` file:
    ```bash
    nano .env
    ```
    Paste your variables:
    ```env
    DATABASE_URL=postgresql://...
    BETTER_AUTH_SECRET=...
    BETTER_AUTH_URL=http://your_droplet_ip:3000
    NEXT_PUBLIC_SERVER_URL=http://your_droplet_ip:3000
    ```
6.  **Run with Docker Compose**:
    (Ensure `docker-compose.yml` exists and uses the `Dockerfile`)
    If you don't have a `docker-compose.yml` ready for prod, run:
    ```bash
    docker build -t chat-app .
    docker run -d -p 3000:3000 --env-file .env --name chat chat-app
    ```
    *Note: You'll likely need a separate Postgres container or Managed DB.*

## Important Notes
- **Prisma Migrations**:
    When deploying, you need to apply existing migrations.
    The `Dockerfile` builds the client, but doesn't run `migrate deploy`.
    **App Platform**: Add a "Job" (Pre-deploy) or "Run Command" to execute:
    `npx prisma migrate deploy`
    **Droplet**: Run `docker exec chat npx prisma migrate deploy` manually after startup.
