#import <Capacitor/Capacitor.h>

CAP_PLUGIN(WifiInfoPlugin, "WifiInfo",
           CAP_PLUGIN_METHOD(getInfo, CAPPluginReturnPromise);)
