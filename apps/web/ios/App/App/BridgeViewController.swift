import UIKit
import Capacitor

class BridgeViewController: CAPBridgeViewController {
    override open func viewDidLoad() {
        super.viewDidLoad()
        NSLog("[BridgeViewController] viewDidLoad called")
        debugPluginRegistration()
    }

    override open func capacitorDidLoad() {
        NSLog("[BridgeViewController] capacitorDidLoad called, bridge is: %@",
              bridge != nil ? "present" : "nil")
        bridge?.registerPluginType(WifiConfigPlugin.self)
        bridge?.registerPluginType(WifiInfoPlugin.self)
        bridge?.registerPluginType(SignificantLocationPlugin.self)
        NSLog("[BridgeViewController] Registered custom plugins via capacitorDidLoad")
    }

    private func debugPluginRegistration() {
        // 1. Check if NSClassFromString can find our classes
        let customPlugins = ["WifiConfigPlugin", "WifiInfoPlugin", "SignificantLocationPlugin", "CapacitorSQLitePlugin"]
        for name in customPlugins {
            if let cls = NSClassFromString(name) {
                NSLog("[DEBUG] NSClassFromString('%@') = %@ (superclass: %@)",
                      name,
                      String(describing: cls),
                      String(describing: cls.superclass()))
                // Check CAPPlugin conformance
                if cls is CAPPlugin.Type {
                    NSLog("[DEBUG]   -> IS CAPPlugin subclass")
                } else {
                    NSLog("[DEBUG]   -> NOT CAPPlugin subclass!")
                }
                // Check CAPBridgedPlugin conformance
                if cls.conforms(to: NSProtocolFromString("CAPBridgedPlugin")!) {
                    NSLog("[DEBUG]   -> CONFORMS to CAPBridgedPlugin")
                } else {
                    NSLog("[DEBUG]   -> DOES NOT conform to CAPBridgedPlugin!")
                }
            } else {
                NSLog("[DEBUG] NSClassFromString('%@') = NIL (class not found in ObjC runtime!)", name)
            }
        }

        // 2. Check a known working plugin for comparison
        if let geo = NSClassFromString("GeolocationPlugin") {
            NSLog("[DEBUG] NSClassFromString('GeolocationPlugin') = %@ (superclass: %@)",
                  String(describing: geo),
                  String(describing: geo.superclass()))
        } else {
            NSLog("[DEBUG] NSClassFromString('GeolocationPlugin') = NIL")
        }

        // 3. Check if capacitor.config.json is in the bundle
        if let configURL = Bundle.main.url(forResource: "capacitor.config", withExtension: "json") {
            NSLog("[DEBUG] capacitor.config.json found at: %@", configURL.absoluteString)
            if let data = try? Data(contentsOf: configURL),
               let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
               let classList = json["packageClassList"] as? [String] {
                NSLog("[DEBUG] packageClassList has %d entries: %@",
                      classList.count,
                      classList.joined(separator: ", "))
            }
        } else {
            NSLog("[DEBUG] capacitor.config.json NOT FOUND in bundle!")
        }
    }
}
