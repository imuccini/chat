# Set a static NAS ID
Connettiti al router:

Bash
ssh root@192.168.8.1
Identifica l'interfaccia Wi-Fi: Esegui questo comando per vedere le tue interfacce wireless:

Bash
uci show wireless
Cerca la sezione che corrisponde alla tua rete (es: wireless.@wifi-iface[0]).

Imposta il NAS ID: Sostituisci Local_Beach_01 con il nome che vuoi dare al router e assicurati di puntare all'indice corretto (solitamente [0] per la 2.4GHz e [1] per la 5GHz):

Bash
uci set wireless.@wifi-iface[0].nasid='Local_Beach_01'
uci set wireless.@wifi-iface[1].nasid='Local_Beach_01'
uci commit wireless
Riavvia il Wi-Fi:

Bash
wifi