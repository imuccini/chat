# TrenoChat - Documentazione Architettura e Know-How

Questo documento raccoglie tutte le informazioni cruciali sull'architettura, le scelte implementative e i pattern utilizzati in TrenoChat, una chat geolocalizzata che permette solo alle persone fisicamente presenti nello stesso luogo di comunicare.

---

## Obiettivo del Progetto

TrenoChat è una chat room temporanea basata sulla posizione fisica. L'obiettivo è creare spazi di conversazione effimeri per persone che condividono un luogo fisico (es. un treno, una stazione, un locale).

### Canali di Distribuzione
1. **Web App (Captive Portal)**: L'utente si connette al WiFi locale e viene reindirizzato alla chat tramite captive portal. Il `nas_id` nell'URL identifica il tenant.
2. **App Nativa (Capacitor)**: L'app mobile identifica il tenant tramite l'IP pubblico della connessione o, in futuro, tramite il BSSID del WiFi (wifi-wizard2).

---

## Stack Tecnologico

| Layer | Tecnologia | Note |
|-------|------------|------|
| Frontend | Next.js (React) | App Router, Client Components |
| Styling | Tailwind CSS | Con `tailwindcss-animate` |
| Mobile | Capacitor | iOS/Android, asset bundled localmente |
| Backend | Express.js + Socket.IO | Server custom per Next.js + WebSocket |
| Database | PostgreSQL + Prisma | ORM con schema multi-tenant |
| State | TanStack Query | Cache e sync con SQLite locale |
| Offline | `@capacitor-community/sqlite` | Solo app native |

---

## Architettura Multi-Tenant

### Identificazione Tenant

Il sistema risolve il tenant in ordine di priorità (gestito in `server.js` endpoint `/api/validate-nas`):

1. **BSSID (App Nativa)**: Letto via `@capgo/capacitor-wifi` → Lookup su `NasDevice.bssid`
2. **NAS ID (Captive Portal)**: `?nas_id=ae:b6:ac:f9:6e:1e` → Lookup su `NasDevice.nasId`
3. **VPN IP**: Header `x-forwarded-for` → Lookup su `NasDevice.vpnIp`
4. **Public IP**: Header `x-forwarded-for` → Lookup su `NasDevice.publicIp`

**Flusso Client → Server:**
- Client (`app/page.tsx`) → `services/apiService.ts` → HTTP → `server.js` → Prisma

### Schema Database (Prisma)

```prisma
model Tenant {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  metadata  Json?    // Customizzazioni (colori, loghi)
  devices   NasDevice[]
  messages  Message[]
}

model NasDevice {
  id        String   @id @default(uuid())
  nasId     String?  @unique   // MAC del NAS (captive portal)
  vpnIp     String?  @unique   // IP VPN del device
  publicIp  String?  @unique   // IP pubblico
  tenantId  String
  tenant    Tenant   @relation(...)
}

model Message {
  id           String   @id @default(uuid())
  text         String
  senderId     String
  senderAlias  String
  senderGender String
  recipientId  String?  // null = pubblico, valorizzato = privato
  tenantId     String
  tenant       Tenant   @relation(...)
}
```

---

## Flusso Utente

### Web App (Captive Portal)
1. Utente connesso a WiFi locale
2. Redirect a `https://chat.example.com/?nas_id=XX:XX:XX:XX:XX:XX`
3. `app/page.tsx` chiama `clientResolveTenant(nasId)`
4. Server cerca `NasDevice` per `nasId` e restituisce `tenantSlug`
5. Redirect a `/[tenantSlug]` → Mostra chat del tenant

### App Nativa
1. App chiama API con IP pubblico (header `x-forwarded-for`)
2. Server cerca `NasDevice` per `publicIp` o `vpnIp`
3. Restituisce `tenantSlug` e l'app naviga alla chat

---

## Gestione Messaggi

### Flusso Real-time (Socket.IO)
1. Client emette `sendMessage` con dati messaggio
2. Server salva su Prisma (`prisma.message.create`)
3. Server emette `newMessage` a tutti i client del tenant (broadcast)
4. Client riceve e aggiorna cache TanStack Query

### Sync Offline (Solo Native)
- `@capacitor-community/sqlite` per storage locale
- `sqliteService.saveMessage()` salva ogni messaggio ricevuto
- Al riavvio, TanStack Query carica prima da SQLite, poi sincronizza con server

**Nota**: SQLite è disabilitato sul browser per evitare errori con `jeep-sqlite`.

---

## Configurazione Build

### Sviluppo Locale
```bash
npm run dev
```
- Next.js in modalità development
- Server Express con Socket.IO
- Prisma connesso a PostgreSQL locale

### Build per Capacitor
```bash
npm run build:cap
npx cap copy
```
- `NEXT_STATIC_EXPORT=true` attiva `output: 'export'` in `next.config.mjs`
- Genera cartella `out/` con HTML statico
- Admin escluso dalla build statica (spostato temporaneamente)

---

## Scelte Implementative e Ottimizzazioni

### ✅ Scelte Corrette
1. **Socket.IO per real-time**: Perfetto per chat, bassa latenza
2. **TanStack Query + SQLite**: Ottimo pattern offline-first per mobile
3. **Multi-tenant con slug**: URL pulite, SEO-friendly
4. **Prisma ORM**: Tipizzazione forte, migrazioni facili
5. **Capacitor**: Unica codebase per web + mobile

### ⚠️ Aree di Miglioramento (Risolte)

1. ~~**Autenticazione Guest**: Considerare token anonimo salvato in localStorage/SQLite.~~ *(Parzialmente risolto - user salvato in localStorage)*

2. ~~**Messaggi Privati**: Persistere anche i messaggi privati in SQLite per offline.~~ ✅ **Risolto** - Ora salvati in SQLite su send/receive.

3. ~~**Tenant Hardcoded**: Generare dinamicamente da DB.~~ ✅ **Risolto** - `generateStaticParams()` ora legge da DB con fallback.

4. ~~**Rate Limiting Socket**: Implementare throttling su `sendMessage`.~~ ✅ **Risolto** - 1 msg ogni 500ms per socket.

5. ~~**Validazione Input**: Sanitizzare messaggi lato server.~~ ✅ **Risolto** - Max 1000 caratteri, HTML stripping.


---

## Comandi Utili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia server sviluppo |
| `npm run build:cap` | Build statico per Capacitor |
| `npx cap copy` | Copia build nelle cartelle native |
| `npx cap open ios` | Apri progetto Xcode |
| `npx cap open android` | Apri progetto Android Studio |
| `npx prisma db push` | Sincronizza schema con DB |
| `npx prisma db seed` | Popola DB con dati di test |
| `npx prisma studio` | GUI per esplorare DB |

---

## File Chiave

| File | Scopo |
|------|-------|
| `server.js` | Entry point: Express + Socket.IO + Next.js + API endpoints |
| `services/apiService.ts` | Client-side API calls (resolve tenant, get messages) |
| `services/messageService.ts` | Server-side message creation |
| `lib/wifi.ts` | Utility per lettura BSSID WiFi (Capacitor) |
| `lib/sqlite.ts` | Servizio SQLite per offline |
| `prisma/schema.prisma` | Schema database |
| `components/ChatInterface.tsx` | Componente principale chat |
| `components/GlobalChat.tsx` | UI messaggi pubblici |
| `config.ts` | URL API (native vs web) |
| `capacitor.config.ts` | Configurazione Capacitor |

---

## Prossimi Sviluppi Suggeriti

1. ~~**WiFi Wizard 2**: Integrare `@nicoraii/capacitor-wifi-wizard` per leggere BSSID.~~ ✅ **Implementato** con `@capgo/capacitor-wifi`.
2. **Push Notifications**: Per messaggi privati quando l'app è in background.
3. **Moderazione**: Sistema di segnalazione/ban per contenuti inappropriati.
4. **Analytics**: Tracciare numero utenti attivi per tenant.
5. **Personalizzazione Tenant**: Usare `metadata` JSON per colori/logo custom.

