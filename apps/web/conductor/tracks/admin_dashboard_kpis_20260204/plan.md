# Implementation Plan: Admin Dashboard Enhancements: User & Message KPIs

This plan details the steps to implement admin dashboard enhancements for user and message KPIs, as defined in the specification.

---

## Phase 1: Data Collection & Aggregation for User Monitoring

- [ ] Task: Implement backend logic to count active users per tenant
    - [ ] Write Failing Tests: Active user counting logic
    - [ ] Implement Feature: Define "active user" criteria in code
    - [ ] Implement Feature: Query database for active users per tenant
    - [ ] Refactor (Optional)
    - [ ] Verify Coverage
    - [ ] Commit Code Changes
    - [ ] Attach Task Summary with Git Notes
    - [ ] Get and Record Task Commit SHA
    - [ ] Commit Plan Update
- [ ] Task: Implement backend logic to count total users across all tenants
    - [ ] Write Failing Tests: Total user counting logic
    - [ ] Implement Feature: Query database for total users
    - [ ] Refactor (Optional)
    - [ ] Verify Coverage
    - [ ] Commit Code Changes
    - [ ] Attach Task Summary with Git Notes
    - [ ] Get and Record Task Commit SHA
    - [ ] Commit Plan Update
- [ ] Task: Create API endpoints for user monitoring data
    - [ ] Write Failing Tests: User monitoring API endpoints
    - [ ] Implement Feature: Endpoint for active users per tenant
    - [ ] Implement Feature: Endpoint for total users
    - [ ] Refactor (Optional)
    - [ ] Verify Coverage
    - [ ] Commit Code Changes
    - [ ] Attach Task Summary with Git Notes
    - [ ] Get and Record Task Commit SHA
    - [ ] Commit Plan Update
- [ ] Task: Conductor - User Manual Verification 'Data Collection & Aggregation for User Monitoring' (Protocol in workflow.md)

## Phase 2: Data Collection & Aggregation for Message KPIs

- [ ] Task: Implement backend logic to track message exchange trends daily
    - [ ] Write Failing Tests: Daily message count aggregation
    - [ ] Implement Feature: Modify message logging/storage to facilitate daily counts
    - [ ] Implement Feature: Query database for daily message trends
    - [ ] Refactor (Optional)
    - [ ] Verify Coverage
    - [ ] Commit Code Changes
    - [ ] Attach Task Summary with Git Notes
    - [ ] Get and Record Task Commit SHA
    - [ ] Commit Plan Update
- [ ] Task: Implement backend logic to track active users per day (historic)
    - [ ] Write Failing Tests: Historic active user aggregation
    - [ ] Implement Feature: Store/aggregate daily active user data
    - [ ] Implement Feature: Query database for daily active user trends
    - [ ] Refactor (Optional)
    - [ ] Verify Coverage
    - [ ] Commit Code Changes
    - [ ] Attach Task Summary with Git Notes
    - [ ] Get and Record Task Commit SHA
    - [ ] Commit Plan Update
- [ ] Task: Implement backend logic to split anonymous vs. authenticated messages
    - [ ] Write Failing Tests: Anonymous/authenticated message split
    - [ ] Implement Feature: Identify message sender as anonymous or authenticated
    - [ ] Implement Feature: Aggregate message counts by user type
    - [ ] Refactor (Optional)
    - [ ] Verify Coverage
    - [ ] Commit Code Changes
    - [ ] Attach Task Summary with Git Notes
    - [ ] Get and Record Task Commit SHA
    - [ ] Commit Plan Update
- [ ] Task: Create API endpoints for message KPI data
    - [ ] Write Failing Tests: Message KPI API endpoints
    - [ ] Implement Feature: Endpoint for historic message trends
    - [ ] Implement Feature: Endpoint for historic active user trends
    - [ ] Implement Feature: Endpoint for anonymous/authenticated message split
    - [ ] Refactor (Optional)
    - [ ] Verify Coverage
    - [ ] Commit Code Changes
    - [ ] Attach Task Summary with Git Notes
    - [ ] Get and Record Task Commit SHA
    - [ ] Commit Plan Update
- [ ] Task: Conductor - User Manual Verification 'Data Collection & Aggregation for Message KPIs' (Protocol in workflow.md)

## Phase 3: Admin Dashboard Frontend Integration

- [ ] Task: Update Tenants table to display live users per tenant
    - [ ] Write Failing Tests: Tenants table live user display
    - [ ] Implement Feature: Fetch active users per tenant from API
    - [ ] Implement Feature: Integrate data into Tenants table UI
    - [ ] Refactor (Optional)
    - [ ] Verify Coverage
    - [ ] Commit Code Changes
    - [ ] Attach Task Summary with Git Notes
    - [ ] Get and Record Task Commit SHA
    - [ ] Commit Plan Update
- [ ] Task: Display total users across all tenants on dashboard
    - [ ] Write Failing Tests: Total users display
    - [ ] Implement Feature: Fetch total users from API
    - [ ] Implement Feature: Integrate data into dashboard UI
    - [ ] Refactor (Optional)
    - [ ] Verify Coverage
    - [ ] Commit Code Changes
    - [ ] Attach Task Summary with Git Notes
    - [ ] Get and Record Task Commit SHA
    - [ ] Commit Plan Update
- [ ] Task: Implement UI components for message KPI dashboard
    - [ ] Write Failing Tests: Message KPI dashboard UI rendering
    - [ ] Implement Feature: Chart/table for historic message trends
    - [ ] Implement Feature: Chart/table for historic active user trends
    - [ ] Implement Feature: Display for anonymous/authenticated split
    - [ ] Refactor (Optional)
    - [ ] Verify Coverage
    - [ ] Commit Code Changes
    - [ ] Attach Task Summary with Git Notes
    - [ ] Get and Record Task Commit SHA
    - [ ] Commit Plan Update
- [ ] Task: Integrate message KPI data into dashboard UI
    - [ ] Write Failing Tests: Message KPI data integration
    - [ ] Implement Feature: Fetch historic message trends from API
    - [ ] Implement Feature: Fetch historic active user trends from API
    - [ ] Implement Feature: Fetch anonymous/authenticated message split from API
    - [ ] Refactor (Optional)
    - [ ] Verify Coverage
    - [ ] Commit Code Changes
    - [ ] Attach Task Summary with Git Notes
    - [ ] Get and Record Task Commit SHA
    - [ ] Commit Plan Update
- [ ] Task: Conductor - User Manual Verification 'Admin Dashboard Frontend Integration' (Protocol in workflow.md)
