# Fix Tenant Room Seeding

[Goal Description]
The API endpoint `/api/tenants/setup-review` handles initial tenant creation/setup for testing or review purposes. Currently, it creates a tenant but fails to create the "Annunci" room, only creating a "General" room (which might not even match the tenant name if not for a weird observation). The goal is to ensure the "Annunci" room is created during this setup phase.

## User Review Required
None.

## Proposed Changes
### Backend
#### [MODIFY] [tenant.service.ts](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/api/src/tenant/tenant.service.ts)
- In `ensureReviewTenant`, update the `prisma.tenant.create` data to include nested room creation:
  - Create "Annunci" room (Type: ANNOUNCEMENT, Description: "Messaggi da [TenantName]")
  - Create "General" room (Type: GENERAL, Description: "Discussione generale e chat pubblica", Name: [TenantName])
- Remove the separate logic that creates "General" room if no rooms exist, OR modify it to create missing rooms more robustly (e.g. check specifically for Annunci and General). For now, making it part of the creation transaction is cleaner for new tenants. For existing tenants, we might want to ensure missing rooms are added.

## Verification Plan
### Manual Verification
- Simulate a call to `ensureReviewTenant` with a new tenant name.
- Verify `rooms` array in the returned tenant object includes both "Annunci" and the General room.
