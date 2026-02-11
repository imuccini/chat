# Task: Debugging Prisma Validation Error

## Investigation
- [x] Examine stack trace and error message <!-- id: 0 -->
- [x] Review `app/actions/adminTenant.ts` around line 171 <!-- id: 1 -->
- [x] Review `lib/authorize.ts` around line 48 <!-- id: 2 -->
- [x] Reproduce or trace the source of the null ID <!-- id: 3 -->

## Implementation
- [x] Fix the logic passing null to `findUnique` <!-- id: 4 -->
- [x] Add guard clauses to prevent null IDs in authorized lookups <!-- id: 5 -->

## Verification
- [ ] Verify the fix by reviewing the code logic <!-- id: 6 -->
- [ ] (Optional) Run a test script if possible <!-- id: 7 -->

# Task: Enhanced Registered Users Page

## Implementation
- [x] Refine `components/admin/users/columns.tsx` (Add Searchability/Email) <!-- id: 100 -->
- [x] Create/Update `components/admin/users/user-data-table.tsx` (Search, Pagination, Scroll) <!-- id: 101 -->
- [x] Update `app/_admin/(authenticated)/users/page.tsx` (Style fix, new table) <!-- id: 102 -->

## Verification
- [x] Verify Search functionality <!-- id: 103 -->
- [x] Verify Pagination <!-- id: 104 -->
- [x] Verify Scroll behavior and Layout (no double border) <!-- id: 105 -->

# Task: Chat Re-opening & Swipe Icon Fix

## Implementation
- [x] Backend: Add `unhideConversation` to `ChatService.ts` <!-- id: 200 -->
- [x] Backend: Trigger `unhideConversation` in `ChatGateway.ts` on new message <!-- id: 201 -->
- [x] Frontend: Fix icon visibility in `SwipeableChatItem.tsx` <!-- id: 202 -->

## Verification
- [x] Verify chat re-appears on new message <!-- id: 203 -->
- [x] Verify swipe icon is visible <!-- id: 204 -->
