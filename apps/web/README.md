# Treno Chat Local

Questa applicazione permette ai passeggeri di chattare localmente.
Basata su Next.js (App Router), PostgreSQL (Prisma) e Custom Server (Socket.IO).

## Prerequisiti

- Node.js 18+
- Docker Desktop (per il database locale)
- npm

## Setup Locale e Configurazione DB

Segui questi passaggi per configurare l'ambiente su un nuovo computer:

1.  **Installa le dipendenze:**
    ```bash
    npm install
    ```

2.  **Configura le variabili d'ambiente:**
    Copia `.env.example` in `.env` (se non esiste, assicurati di avere `DATABASE_URL` corretto).
    ```bash
    # Esempio .env locale
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/chat_db?schema=public"
    ```

3.  **Avvia il Database (Docker):**
    Assicurati che Docker Desktop sia attivo, poi lancia:
    ```bash
    docker compose up -d
    ```

4.  **Esegui le Migrazioni del DB:**
    Questo comando crea le tabelle nel database PostgreSQL.
    ```bash
    npx prisma migrate dev
    ```

5.  **Popola il Database (Seed):**
    Inserisce i dati iniziali (Tenant, etc.) necessari per il funzionamento.
    ```bash
    npx prisma db seed
    ```

6.  **Avvia l'Applicazione:**
    ```bash
    npm run dev
    ```
    L'app sarà disponibile su `http://localhost:3000`.

## Sviluppo Mobile (Capacitor)

Se sviluppi per mobile (iOS/Android):

1.  Assicurati che `capacitor.config.ts` punti all'IP locale del tuo computer (es. `192.168.1.x`) invece di `localhost` se testi su dispositivo fisico.
2.  Sincronizza le modifiche native:
    ```bash
    npx cap sync
    ```
3.  Apri l'IDE nativo:
    ```bash
    npx cap open ios  # o android
    ```
