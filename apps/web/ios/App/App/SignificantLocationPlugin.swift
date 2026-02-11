import Foundation
import Capacitor
import CoreLocation

@objc(SignificantLocationPlugin)
public class SignificantLocationPlugin: CAPPlugin, CAPBridgedPlugin, CLLocationManagerDelegate {
    public let identifier = "SignificantLocationPlugin"
    public let jsName = "SignificantLocation"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "start", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise)
    ]

    private var locationManager: CLLocationManager?

    @objc func start(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if self.locationManager == nil {
                self.locationManager = CLLocationManager()
                self.locationManager?.delegate = self
            }

            guard CLLocationManager.significantLocationChangeMonitoringAvailable() else {
                call.reject("Significant location change monitoring is not available")
                return
            }

            self.locationManager?.startMonitoringSignificantLocationChanges()
            call.resolve(["status": "started"])
        }
    }

    @objc func stop(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.locationManager?.stopMonitoringSignificantLocationChanges()
            call.resolve(["status": "stopped"])
        }
    }

    // CLLocationManagerDelegate
    public func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else { return }

        notifyListeners("locationChange", data: [
            "latitude": location.coordinate.latitude,
            "longitude": location.coordinate.longitude,
            "accuracy": location.horizontalAccuracy,
            "timestamp": location.timestamp.timeIntervalSince1970 * 1000
        ])
    }

    public func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("[SignificantLocationPlugin] Error: \(error.localizedDescription)")
    }
}
