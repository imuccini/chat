# Track: Admin Dashboard Enhancements: User & Message KPIs

## Overview

This track focuses on enhancing the admin dashboard with additional monitoring controls to provide a comprehensive overview of user engagement and message exchange key performance indicators (KPIs). The primary objective is to facilitate better decision-making by offering these insights.

## Functional Requirements

### 1. User Monitoring Controls

*   **Active Users per Tenant:** The admin dashboard shall display the number of active users for each tenant **directly within the existing list of Tenants on the dashboard**. An "active user" is defined as any user who has performed any action (e.g., sent message, joined channel, logged in) within a configurable time frame (e.g., last hour, last day).
*   **Total Users Across All Tenants:** The admin dashboard shall display the total number of users across all tenants in the system.

### 2. Message Exchange KPIs Dashboard

*   **Historic Trend of Exchanged Messages per Day:** The dashboard shall display the historic trend of exchanged messages, aggregated daily. The granularity for this data will be on a daily basis.
*   **Active Users per Day (Historic Trend):** The dashboard shall display the historic trend of active users per day, using the definition of "active user" from above.
*   **Split between Anonymous and Authenticated Users:** The dashboard shall display the split between anonymous and authenticated users for message exchange. An "anonymous user" is defined as a user whose identity cannot be traced back to a specific registered account.

## Non-Functional Requirements

*   **Performance:** The dashboard data retrieval and display should be performant, even with a large volume of user activity and messages.
*   **Security:** Access to these new admin controls must be restricted to authenticated and authorized administrators.
*   **Usability:** The new controls and dashboards should be intuitive and easy to understand for administrators.

## Acceptance Criteria

*   The admin dashboard successfully displays the number of active users per tenant **within the existing tenants table** based on the defined activity criteria.
*   The admin dashboard successfully displays the total number of users across all tenants.
*   The admin dashboard displays a chart or table showing the daily historic trend of exchanged messages.
*   The admin dashboard displays a chart or table showing the daily historic trend of active users.
*   The admin dashboard accurately displays the ratio or count of messages sent by anonymous versus authenticated users.
*   All data presented is accurate and up-to-date within reasonable latency expectations for monitoring data.

## Out of Scope

*   Real-time push notifications for KPI alerts.
*   Advanced predictive analytics based on the collected data.
*   User-facing reporting features for tenants.
