module.exports = [
"[project]/lib/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/app/actions/adminTenant.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"401cc1da848db9d4bfc7e8fa0fc502a01f0faa21fd":"updateTenantAction","40222dd7266328daa03191545ca92aaf21d415bad7":"createTenantAction","4068ec4e5df7232909953fa6b4233e1db0866e2f2f":"deleteTenantAction"},"",""] */ __turbopack_context__.s([
    "createTenantAction",
    ()=>createTenantAction,
    "deleteTenantAction",
    ()=>deleteTenantAction,
    "updateTenantAction",
    ()=>updateTenantAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function createTenantAction(formData) {
    const name = formData.get('name');
    const slug = formData.get('slug');
    const nasIds = (formData.get('nasIds') || "").split(',').map((s)=>s.trim()).filter(Boolean);
    const publicIps = (formData.get('publicIps') || "").split(',').map((s)=>s.trim()).filter(Boolean);
    const bssids = (formData.get('bssids') || "").split(',').map((s)=>s.trim()).filter(Boolean);
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].tenant.create({
        data: {
            name,
            slug,
            devices: {
                create: [
                    ...nasIds.map((nasId)=>({
                            nasId
                        })),
                    ...publicIps.map((ip)=>({
                            publicIp: ip
                        })),
                    ...bssids.map((bssid)=>({
                            bssid
                        }))
                ]
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard');
}
async function updateTenantAction(formData) {
    const id = formData.get('id');
    const name = formData.get('name');
    const slug = formData.get('slug');
    const nasIds = (formData.get('nasIds') || "").split(',').map((s)=>s.trim()).filter(Boolean);
    const publicIps = (formData.get('publicIps') || "").split(',').map((s)=>s.trim()).filter(Boolean);
    const bssids = (formData.get('bssids') || "").split(',').map((s)=>s.trim()).filter(Boolean);
    // Update basic info
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].tenant.update({
        where: {
            id
        },
        data: {
            name,
            slug
        }
    });
    // Sync devices: Delete all and recreate
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].nasDevice.deleteMany({
        where: {
            tenantId: id
        }
    });
    const devicesToCreate = [
        ...nasIds.map((nasId)=>({
                nasId,
                tenantId: id
            })),
        ...publicIps.map((ip)=>({
                publicIp: ip,
                tenantId: id
            })),
        ...bssids.map((bssid)=>({
                bssid,
                tenantId: id
            }))
    ];
    if (devicesToCreate.length > 0) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].nasDevice.createMany({
            data: devicesToCreate
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard');
}
async function deleteTenantAction(formData) {
    const id = formData.get('id');
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].tenant.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard');
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createTenantAction,
    updateTenantAction,
    deleteTenantAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTenantAction, "40222dd7266328daa03191545ca92aaf21d415bad7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTenantAction, "401cc1da848db9d4bfc7e8fa0fc502a01f0faa21fd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTenantAction, "4068ec4e5df7232909953fa6b4233e1db0866e2f2f", null);
}),
"[project]/.next-internal/server/app/admin/(authenticated)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/adminTenant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/adminTenant.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/.next-internal/server/app/admin/(authenticated)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/adminTenant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "401cc1da848db9d4bfc7e8fa0fc502a01f0faa21fd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTenantAction"],
    "40222dd7266328daa03191545ca92aaf21d415bad7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTenantAction"],
    "4068ec4e5df7232909953fa6b4233e1db0866e2f2f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTenantAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f28$authenticated$292f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/(authenticated)/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/adminTenant.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/adminTenant.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_492426ba._.js.map