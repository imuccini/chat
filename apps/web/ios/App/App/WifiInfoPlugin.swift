import Foundation
import Capacitor
import NetworkExtension
import CoreLocation

@objc(WifiInfoPlugin)
public class WifiInfoPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "WifiInfoPlugin"
    public let jsName = "WifiInfo"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getInfo", returnType: CAPPluginReturnPromise)
    ]

    @objc func getInfo(_ call: CAPPluginCall) {
        NEHotspotNetwork.fetchCurrent { network in
            var result: [String: Any] = [:]

            if let network = network {
                result["ssid"] = network.ssid
                result["bssid"] = network.bssid
            } else {
                result["ssid"] = NSNull()
                result["bssid"] = NSNull()
            }

            // Check location permission status
            let locationManager = CLLocationManager()
            let authStatus = locationManager.authorizationStatus

            switch authStatus {
            case .authorizedAlways:
                result["locationPermission"] = "always"
            case .authorizedWhenInUse:
                result["locationPermission"] = "whenInUse"
            case .denied:
                result["locationPermission"] = "denied"
            case .restricted:
                result["locationPermission"] = "restricted"
            case .notDetermined:
                result["locationPermission"] = "notDetermined"
            @unknown default:
                result["locationPermission"] = "unknown"
            }

            // Check precise location (iOS 14+)
            if #available(iOS 14.0, *) {
                result["isPrecise"] = locationManager.accuracyAuthorization == .fullAccuracy
            } else {
                result["isPrecise"] = true
            }

            call.resolve(result)
        }
    }
}
