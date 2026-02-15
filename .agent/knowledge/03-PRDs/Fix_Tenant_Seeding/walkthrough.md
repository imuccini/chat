# Tenant Seeding Fix Walkthrough

I have updated the `ensureReviewTenant` method in `TenantService` to correctly seed the "Annunci" room.

## Changes
- Modified `prisma.tenant.create` to include nested creation of:
  - "Annunci" room (Type: ANNOUNCEMENT)
  - General room (Type: GENERAL, Name: [TenantName])
- Added logic to backfill missing rooms ("Annunci") for existing tenants that might have been created incorrectly.

## Verification
- **New Tenant**: Calling `/api/tenants/setup-review?name=NewTenant` will create a tenant with both rooms.
- **Existing Tenant (Partial)**: Calling `/api/tenants/setup-review?name=ExistingTenant` where `Annunci` is missing will now create it.
