#import <Capacitor/Capacitor.h>

CAP_PLUGIN(WifiConfigPlugin, "WifiConfig",
           CAP_PLUGIN_METHOD(connect, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(disconnect, CAPPluginReturnPromise);)
