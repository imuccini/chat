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

/* __next_internal_action_entry_do_not_use__ [{"40bdb7c9865e96a390e2546499f14eca46e340eb79":"updateTenantAction","40c050bf77f2896f4527a748e19af19c5226df4064":"deleteTenantAction","40d7d6cc51d97c2551b22a9a4cb62656e69da719f9":"createTenantAction"},"",""] */ __turbopack_context__.s([
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
    const nasIds = formData.get('nasIds').split(',').map((s)=>s.trim()).filter(Boolean);
    const publicIps = (formData.get('publicIps') || "").split(',').map((s)=>s.trim()).filter(Boolean);
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
    const nasIds = formData.get('nasIds').split(',').map((s)=>s.trim()).filter(Boolean);
    const publicIps = (formData.get('publicIps') || "").split(',').map((s)=>s.trim()).filter(Boolean);
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTenantAction, "40d7d6cc51d97c2551b22a9a4cb62656e69da719f9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTenantAction, "40bdb7c9865e96a390e2546499f14eca46e340eb79", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTenantAction, "40c050bf77f2896f4527a748e19af19c5226df4064", null);
}),
"[project]/.next-internal/server/app/admin/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/adminTenant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/adminTenant.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/.next-internal/server/app/admin/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/adminTenant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40bdb7c9865e96a390e2546499f14eca46e340eb79",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTenantAction"],
    "40c050bf77f2896f4527a748e19af19c5226df4064",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTenantAction"],
    "40d7d6cc51d97c2551b22a9a4cb62656e69da719f9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTenantAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/adminTenant.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$adminTenant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/adminTenant.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_29c0d7d7._.js.map