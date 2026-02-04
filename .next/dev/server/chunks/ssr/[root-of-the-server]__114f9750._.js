module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/app/icon0.svg.mjs { IMAGE => \"[project]/app/icon0.svg (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/icon0.svg.mjs { IMAGE => \"[project]/app/icon0.svg (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/app/icon1.png.mjs { IMAGE => \"[project]/app/icon1.png (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/icon1.png.mjs { IMAGE => \"[project]/app/icon1.png (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/app/apple-icon.png.mjs { IMAGE => \"[project]/app/apple-icon.png (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/apple-icon.png.mjs { IMAGE => \"[project]/app/apple-icon.png (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@capacitor/core/dist/index.js [app-rsc] (ecmascript)");
;
// Detect if running natively (iOS or Android)
const isNative = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Capacitor"].isNativePlatform();
const API_BASE_URL = isNative ? ("TURBOPACK compile-time value", "http://192.168.1.111:3000") || 'http://localhost:3000' : '';
if (isNative) {
    console.log("[ChatConfig] Native Platform Detected. API_BASE_URL:", API_BASE_URL);
}
}),
"[project]/services/apiService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clientGetMessages",
    ()=>clientGetMessages,
    "clientGetTenantBySlug",
    ()=>clientGetTenantBySlug,
    "clientResolveTenant",
    ()=>clientResolveTenant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config.ts [app-rsc] (ecmascript)");
;
const clientResolveTenant = async (urlNasId, bssid)=>{
    const params = new URLSearchParams();
    if (bssid) params.append('bssid', bssid);
    if (urlNasId) params.append('nas_id', urlNasId);
    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/api/validate-nas${query}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.valid ? data.tenantSlug : null;
};
const clientGetTenantBySlug = async (slug)=>{
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/api/tenants/${slug}`);
    if (!res.ok) return null;
    return await res.json();
};
const clientGetMessages = async (tenantSlug)=>{
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/api/messages?tenant=${tenantSlug}`);
    if (!res.ok) return [];
    return await res.json();
};
}),
"[project]/lib/wifi.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkAndRequestLocationPermissions",
    ()=>checkAndRequestLocationPermissions,
    "getConnectedWifiInfo",
    ()=>getConnectedWifiInfo,
    "isWifiEnabled",
    ()=>isWifiEnabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@capacitor/core/dist/index.js [app-rsc] (ecmascript)");
;
// Dynamic import to avoid issues on web
let CapacitorWifi = null;
async function loadWifiPlugin() {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Capacitor"].isNativePlatform() && !CapacitorWifi) {
        try {
            const module = await __turbopack_context__.A("[project]/node_modules/@capgo/capacitor-wifi/dist/esm/index.js [app-rsc] (ecmascript, async loader)");
            CapacitorWifi = module.CapacitorWifi;
        } catch (err) {
            console.error('Failed to load WiFi plugin:', err);
        }
    }
    return CapacitorWifi;
}
async function getConnectedWifiInfo() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Capacitor"].isNativePlatform()) {
        return {
            ssid: null,
            bssid: null,
            isConnected: false
        };
    }
    const wifi = await loadWifiPlugin();
    if (!wifi) {
        return {
            ssid: null,
            bssid: null,
            isConnected: false
        };
    }
    try {
        const info = await wifi.getWifiInfo();
        return {
            ssid: info.ssid || null,
            bssid: info.bssid || null,
            isConnected: !!info.ssid
        };
    } catch (err) {
        console.error('Error getting WiFi info:', err);
        return {
            ssid: null,
            bssid: null,
            isConnected: false
        };
    }
}
async function checkAndRequestLocationPermissions() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Capacitor"].isNativePlatform()) {
        return true; // Not needed on web
    }
    const wifi = await loadWifiPlugin();
    if (!wifi) {
        return false;
    }
    try {
        // Check current permission status
        const status = await wifi.checkPermissions();
        if (status.location === 'granted') {
            return true;
        }
        // Request permissions if not granted
        const result = await wifi.requestPermissions();
        return result.location === 'granted';
    } catch (err) {
        console.error('Error checking/requesting permissions:', err);
        return false;
    }
}
async function isWifiEnabled() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Capacitor"].isNativePlatform()) {
        return true; // Assume true on web
    }
    const wifi = await loadWifiPlugin();
    if (!wifi) {
        return false;
    }
    try {
        const status = await wifi.getStatus();
        return status.enabled;
    } catch (err) {
        console.error('Error checking WiFi status:', err);
        return false;
    }
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/apiService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@capacitor/core/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wifi$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wifi.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
function HomeContent() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])('loading');
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function init() {
            try {
                const isNative = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Capacitor"].isNativePlatform();
                const nasId = searchParams.get('nas_id') || undefined;
                let bssid = undefined;
                // Native app: attempt to get BSSID, but don't block if failed
                if (isNative) {
                    try {
                        const wifiCheckPromise = async ()=>{
                            const hasPermission = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wifi$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkAndRequestLocationPermissions"])();
                            if (hasPermission) {
                                const wifiInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wifi$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getConnectedWifiInfo"])();
                                if (wifiInfo.isConnected && wifiInfo.bssid) {
                                    bssid = wifiInfo.bssid;
                                }
                            }
                        };
                        const timeoutPromise = new Promise((_, reject)=>setTimeout(()=>reject(new Error("Timeout")), 1500));
                        await Promise.race([
                            wifiCheckPromise(),
                            timeoutPromise
                        ]);
                    } catch (e) {
                        console.warn("WiFi detection skipped or failed:", e);
                    }
                }
                // Resolve tenant
                const tenantSlug = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clientResolveTenant"])(nasId, bssid);
                if (tenantSlug) {
                    router.replace(`/${tenantSlug}`);
                } else {
                    setState('tenant_not_found');
                }
            } catch (err) {
                console.error("Failed to resolve tenant", err);
                setErrorMessage("Errore durante l'identificazione dello spazio chat.");
                setState('error');
            }
        }
        init();
    }, [
        router,
        searchParams
    ]);
    // Loading state
    if (state === 'loading') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-24 h-24 mb-6 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/local_logo.svg",
                        alt: "Local Logo",
                        className: "w-full h-full object-contain animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 70,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 69,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-400 font-medium",
                    children: "Inizializzazione in corso..."
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 72,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "absolute bottom-6 w-full text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 text-xs font-medium",
                        children: "Powered by Local - Copyright 2025"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 75,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 74,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 68,
            columnNumber: 13
        }, this);
    }
    // Error states
    const errorConfig = {
        permission_denied: {
            title: "Permessi Richiesti",
            message: "Per identificare la tua posizione, l'app ha bisogno del permesso di localizzazione.",
            hint: "Vai nelle Impostazioni del telefono e abilita i permessi di localizzazione per TrenoChat."
        },
        wifi_disconnected: {
            title: "WiFi Non Connesso",
            message: "Devi essere connesso alla rete WiFi del locale per accedere alla chat.",
            hint: "Connettiti al WiFi del treno o del locale e riprova."
        },
        tenant_not_found: {
            title: "Accesso Negato",
            message: "Impossibile identificare lo spazio chat.",
            hint: "Assicurati di essere connesso al WiFi corretto (es. Treno WiFi)."
        },
        error: {
            title: "Errore",
            message: errorMessage || "Si è verificato un errore imprevisto.",
            hint: "Riprova più tardi."
        }
    };
    const config = errorConfig[state];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen w-full flex items-center justify-center bg-gray-100 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center p-8 bg-white rounded-2xl shadow-lg max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-24 h-24 mx-auto mb-6 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/local_logo.svg",
                            alt: "Local Logo",
                            className: "w-full h-full object-contain"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 113,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 112,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-gray-800 mb-2",
                        children: config.title
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 115,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-2",
                        children: config.message
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 116,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 text-sm",
                        children: config.hint
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 117,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        className: "mt-6 px-6 py-2.5 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors",
                        children: "Riprova"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 119,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 111,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "absolute bottom-6 w-full text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400 text-xs font-medium",
                    children: "Powered by Local - Copyright 2025"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 128,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 127,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 110,
        columnNumber: 9
    }, this);
}
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen w-full flex items-center justify-center bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-pulse text-gray-400 font-medium",
                children: "Inizializzazione in corso..."
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 140,
                columnNumber: 17
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 139,
            columnNumber: 13
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeContent, {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 143,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 138,
        columnNumber: 9
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__114f9750._.js.map