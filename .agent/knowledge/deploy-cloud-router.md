Per puntare il Captive Portal verso la tua nuova istanza su DigitalOcean, devi aggiornare la configurazione del router affinché non cerchi più il tuo Mac locale, ma si colleghi all'IP pubblico.

Ecco i passaggi esatti da eseguire via SSH sul router:

### 1. Aggiorna il file `splash.html`

Questo è il file che gestisce il redirect immediato. Devi cambiare l'indirizzo IP locale con quello di DigitalOcean.

1. Apri il file: `vi /etc/nodogsplash/htdocs/splash.html`
2. Modifica la variabile `targetBase` (o l'URL nel meta-refresh) come segue:

```html
<script type="text/javascript">
    var routerId = "$gatewaymac"; 
    var userId = "$clientmac";
    // Nuovo URL su DigitalOcean
    var targetBase = "http://104.248.196.179:3000/treno-wifi";
    
    var redirectTarget = targetBase + "?nas_id=" + routerId + "&user_id=" + userId;
    window.location.href = redirectTarget;
</script>
<meta http-equiv="refresh" content="0; url=http://104.248.196.179:3000/treno-wifi">

```

### 2. Aggiorna la configurazione UCI

Dobbiamo dire a NoDogSplash che l'URL di atterraggio ufficiale è cambiato e, soprattutto, aggiungere l'IP di DigitalOcean al **Walled Garden** (utenti pre-autenticati). Se non lo fai, il firewall del router bloccherà la connessione verso DigitalOcean perché l'utente non è ancora "loggato".

Esegui questi comandi:

```bash
# Imposta l'URL di redirect predefinito
uci set nodogsplash.@nodogsplash[0].redirecturl='http://104.248.196.179:3000/treno-wifi'

# Sblocca l'IP di DigitalOcean affinché il telefono possa caricare la chat subito
# Nota: sblocchiamo la porta 3000 verso l'IP specifico
uci add_list nodogsplash.@nodogsplash[0].preauthenticated_users='allow tcp port 3000 dest 104.248.196.179'

# Applica le modifiche e riavvia
uci commit nodogsplash
/etc/init.d/nodogsplash restart

```

### 3. Verifica la connettività del Router

Poiché ora il server è "fuori" dalla tua rete locale, il router **deve avere accesso a Internet** per far funzionare la chat.

* Assicurati che il cavo WAN del router sia collegato a una rete con internet o che ci sia una SIM attiva.
* Prova a fare un ping dal router: `ping 104.248.196.179`. Se non risponde, il router non riesce a uscire verso il web.

### 4. Nota importante sulla sicurezza e porta 3000

Al momento stai usando l'IP diretto e la porta 3000 via **HTTP** (non protetto).

* **Problema Apple/Android:** Molti telefoni moderni potrebbero mostrare avvisi di sicurezza aggressivi o bloccare il caricamento di script se non usi **HTTPS** (porta 443).
* **Soluzione consigliata:** Appena puoi, usa Nginx sulla Droplet per mappare la porta 3000 su un dominio con SSL (es. `https://treno-chat.com`).

---

### Prossimo passo

Una volta dati i comandi, prova a connetterti con l'iPhone.

1. Si aprirà il popup NoDogSplash.
2. Il browser cercherà di caricare `104.248.196.179:3000`.

**Se vedi una pagina bianca**, controlla che il firewall della Droplet su DigitalOcean (cliccando su "Networking" -> "Firewalls" nel pannello DO) abbia la **Porta 3000 aperta** per il traffico in entrata.

**Riesci a visualizzare la chat sul telefono ora che punta all'IP pubblico?** Se ricevi un errore di "Timeout", quasi certamente è il firewall di DigitalOcean che blocca la porta 3000.