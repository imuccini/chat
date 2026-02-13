package io.local.app;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkRequest;
import android.net.NetworkCapabilities;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiNetworkSpecifier;
import android.net.wifi.WifiNetworkSuggestion;
import android.os.Build;
import androidx.annotation.RequiresApi;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.ArrayList;
import java.util.List;

@CapacitorPlugin(name = "WifiConfig")
public class WifiConfigPlugin extends Plugin {

    /**
     * OBIETTIVO 1: Connessione immediata/forzata (Android 10+)
     * Utilizza un dialogo di sistema per connettersi subito a una rete specifica.
     */
    @PluginMethod
    public void connectImmediate(PluginCall call) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            call.reject("Richiede Android 10 o superiore");
            return;
        }

        String ssid = call.getString("ssid");
        String password = call.getString("password");

        WifiNetworkSpecifier specifier = new WifiNetworkSpecifier.Builder()
                .setSsid(ssid)
                .setWpa2Passphrase(password)
                .build();

        NetworkRequest request = new NetworkRequest.Builder()
                .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
                .setNetworkSpecifier(specifier)
                .build();

        ConnectivityManager connManager = (ConnectivityManager) getContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        
        connManager.requestNetwork(request, new ConnectivityManager.NetworkCallback() {
            @Override
            public void onAvailable(Network network) {
                // Forza il traffico dell'app su questa WiFi
                connManager.bindProcessToNetwork(network);
                call.resolve(new JSObject().put("status", "connected"));
            }
            @Override
            public void onUnavailable() {
                call.reject("Connessione rifiutata dall'utente o timeout");
            }
        });
    }

    /**
     * OBIETTIVO 2: Installare profilo WiFi nel sistema (WifiNetworkSuggestion)
     * Salva le credenziali nel sistema operativo. Android si connetterà 
     * automaticamente quando rileva la rete in futuro.
     */
    @PluginMethod
    public void addSuggestion(PluginCall call) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            call.reject("Richiede Android 10 o superiore");
            return;
        }

        String ssid = call.getString("ssid");
        String password = call.getString("password");

        WifiNetworkSuggestion suggestion = new WifiNetworkSuggestion.Builder()
                .setSsid(ssid)
                .setWpa2Passphrase(password)
                .setIsAppInteractionRequired(false) // Non chiede conferma ogni volta che si connette
                .build();

        List<WifiNetworkSuggestion> suggestionsList = new ArrayList<>();
        suggestionsList.add(suggestion);

        WifiManager wifiManager = (WifiManager) getContext().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        int status = wifiManager.addNetworkSuggestions(suggestionsList);

        if (status == WifiManager.STATUS_NETWORK_SUGGESTIONS_SUCCESS) {
            call.resolve(new JSObject().put("status", "suggestion_added"));
        } else {
            call.reject("Errore nell'aggiunta del profilo (Status: " + status + ")");
        }
    }
}
