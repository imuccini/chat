import GoogleSignIn
import UIKit
import Capacitor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    private var hasRegisteredPlugins = false

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Register custom Capacitor plugins after the bridge initializes
        // Using async to ensure the storyboard VC + bridge are fully set up
        DispatchQueue.main.async {
            self.registerCustomPlugins()
        }
        return true
    }

    private func registerCustomPlugins() {
        guard !hasRegisteredPlugins else { return }

        guard let vc = window?.rootViewController as? CAPBridgeViewController else {
            NSLog("[AppDelegate] ERROR: rootViewController is not CAPBridgeViewController, type is: %@",
                  String(describing: type(of: window?.rootViewController as Any)))
            return
        }

        guard let bridge = vc.bridge else {
            NSLog("[AppDelegate] ERROR: bridge is nil, retrying in 0.5s...")
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                self.registerCustomPlugins()
            }
            return
        }

        bridge.registerPluginType(WifiConfigPlugin.self)
        bridge.registerPluginType(WifiInfoPlugin.self)
        bridge.registerPluginType(SignificantLocationPlugin.self)
        hasRegisteredPlugins = true
        NSLog("[AppDelegate] Successfully registered custom Capacitor plugins")
    }

    func applicationWillResignActive(_ application: UIApplication) {
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Fallback: retry plugin registration if not done yet
        if !hasRegisteredPlugins {
            registerCustomPlugins()
        }
    }

    func applicationWillTerminate(_ application: UIApplication) {
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        var handled: Bool

        handled = GIDSignIn.sharedInstance.handle(url)
        if handled {
            return true
        }

        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }
}
