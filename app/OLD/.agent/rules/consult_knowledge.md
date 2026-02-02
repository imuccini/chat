---
trigger: model_decision
description: Rule to consult TrenoChat documentation when working on features or architecture
---

# TrenoChat Knowledge Base

When working on this project, **always consult the knowledge base** before making architectural decisions or implementing new features.

## When to Read the Documentation

Read `.agent/knowledge/app_docs.md` when:
- You need to understand how **tenant resolution** works (NAS ID, VPN IP, Public IP)
- You're modifying the **database schema** or Prisma models
- You're working on **real-time messaging** (Socket.IO)
- You're implementing **offline functionality** (SQLite)
- You need to understand the **build process** for Capacitor
- You're unsure about the **project objectives** or constraints

## Quick Reference

- **Objective**: Geolocation-based chat for people in the same physical location
- **Tenant Resolution**: NAS ID (URL) > VPN IP > Public IP
- **Real-time**: Socket.IO for messages
- **Offline**: SQLite on native, disabled on web
- **Build**: `npm run build:cap` for static export