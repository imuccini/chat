import Foundation
import Capacitor
import NetworkExtension

@objc(WifiConfigPlugin)
public class WifiConfigPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "WifiConfigPlugin"
    public let jsName = "WifiConfig"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "connect", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "disconnect", returnType: CAPPluginReturnPromise)
    ]

    @objc func connect(_ call: CAPPluginCall) {
        guard let ssid = call.getString("ssid") else {
            call.reject("SSID is required")
            return
        }
        let password = call.getString("password") ?? ""
        
        // Create configuration for WPA2 Personal
        let hotspotConfig = NEHotspotConfiguration(ssid: ssid, passphrase: password, isWEP: false)
        
        // set joinOnce to false so the phone remembers the network even if the app is closed
        hotspotConfig.joinOnce = false 

        NEHotspotConfigurationManager.shared.apply(hotspotConfig) { error in
            if let error = error as NSError? {
                // Handle specific errors like user cancellation
                if error.domain == NEHotspotConfigurationErrorDomain && error.code == NEHotspotConfigurationError.userDenied.rawValue {
                    call.reject("User cancelled the connection request")
                } else {
                    call.reject("Failed to connect: \(error.localizedDescription)")
                }
            } else {
                call.resolve([
                    "status": "connected",
                    "ssid": ssid
                ])
            }
        }
    }

    @objc func disconnect(_ call: CAPPluginCall) {
        guard let ssid = call.getString("ssid") else {
            call.reject("SSID is required to disconnect")
            return
        }
        
        NEHotspotConfigurationManager.shared.removeConfiguration(forSSID: ssid)
        call.resolve(["status": "disconnected"])
    }
}
