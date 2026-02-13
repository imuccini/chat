
npm run dev

npm run dev:api
npm run dev:web



lsof -ti :3001 | xargs kill -9



Comandi per mobile app

. Preparazione e Compilazione (Build)
Prima di sincronizzare, devi generare i file statici dell'applicazione Next.js. Esiste uno script specifico che gestisce le rotte dinamiche per l'export statico:

cd apps/web
npm run build:cap
Questo comando esegue build_cap.sh, che prepara la cartella out necessaria a Capacitor.

2. Sincronizzazione con Capacitor
Una volta compilato il web bundle, devi "passarlo" alle piattaforme native (iOS/Android):

npx cap sync
Questo comando copia i file della cartella out nelle cartelle ios e android e aggiorna i plugin nativi.

3. Apertura IDE (Xcode / Android Studio)
Per compilare ed eseguire l'app sul simulatore o dispositivo fisico:

Per iOS (Xcode):
npx cap open ios
Per Android (Android Studio):
npx cap open android
Riassunto rapido (One-liner):
Se sei già nella root del progetto e vuoi fare tutto in un colpo solo per iOS:

cd apps/web && npm run build:cap && npx cap:sync && npx cap open ios


COAMNDO:
npm run build:cap && run npx cap:sync:ios

  The fix is now automated and will run every time you sync Android! 🎉

  Try building Android now with:
  npm run cap:sync:android
  npm run cap:open:android




Nota sul Live Reload (Sviluppo)
Se vuoi testare le modifiche in tempo reale senza dover ricompilare ogni volta:

Avvia il server di sviluppo normalmente (npm run dev).
Assicurati che il tuo telefono e il PC siano sulla stessa rete Wi-Fi.
Verifica che in apps/web/capacitor.config.ts l'indirizzo IP sia corretto (non localhost, ma l'IP locale del tuo Mac, es. 192.168.1.XX).
Esegui npx cap sync e avvia l'app dall'IDE.