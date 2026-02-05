import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Message } from '../types';

class SQLiteService {
    private sqlite: SQLiteConnection | null = null;
    private db: SQLiteDBConnection | null = null;
    private dbName: string = 'chat_cache';

    async initialize() {
        console.log("SQLite: Disabled for debugging.");
        return;

        if (!Capacitor.isNativePlatform()) {
            console.log("SQLite: Skipping initialization on non-native platform (Web).");
            return;
        }
        if (this.db) return;

        this.sqlite = new SQLiteConnection(CapacitorSQLite);

        try {
            // Check if connection exists and close it if necessary (for hot-reload)
            const isConn = await this.sqlite.isConnection(this.dbName, false);
            if (isConn.result) {
                await this.sqlite.retrieveConnection(this.dbName, false);
            }

            this.db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
            await this.db.open();

            const schema = `
                CREATE TABLE IF NOT EXISTS messages (
                    id TEXT PRIMARY KEY,
                    text TEXT,
                    senderId TEXT,
                    senderAlias TEXT,
                    senderGender TEXT,
                    timestamp TEXT,
                    recipientId TEXT,
                    roomId TEXT,
                    isGlobal INTEGER DEFAULT 1
                );
            `;
            await this.db.execute(schema);
            console.log("SQLite DB Initialized with schema");
        } catch (err) {
            console.error('SQLite initialization error:', err);
        }
    }

    async saveMessage(msg: Message, isGlobal: boolean = true) {
        if (!this.db) await this.initialize();
        if (!this.db) return;

        const query = `
            INSERT OR REPLACE INTO messages (id, text, senderId, senderAlias, senderGender, timestamp, recipientId, roomId, isGlobal)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const params = [
            msg.id,
            msg.text,
            msg.senderId,
            msg.senderAlias,
            msg.senderGender,
            msg.timestamp,
            msg.recipientId || null,
            msg.roomId || null,
            isGlobal ? 1 : 0
        ];

        try {
            await this.db.run(query, params);
        } catch (err) {
            console.error('Error saving message to SQLite:', err);
        }
    }

    async purgeOldMessages() {
        if (!this.db) await this.initialize();
        if (!this.db) return;

        const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
        try {
            await this.db.run('DELETE FROM messages WHERE timestamp < ?;', [threeHoursAgo]);
            console.log("SQLite: Purged messages older than:", threeHoursAgo);
        } catch (err) {
            console.error('Error purging old messages from SQLite:', err);
        }
    }

    async getMessages(isGlobal: boolean = true, roomId?: string) {
        await this.purgeOldMessages();
        if (!this.db) return [];

        const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
        let query = '';
        let params: any[] = [];

        if (isGlobal) {
            if (roomId) {
                query = `SELECT * FROM messages WHERE roomId = ? AND timestamp >= ? ORDER BY timestamp ASC LIMIT 100;`;
                params = [roomId, threeHoursAgo];
            } else {
                // Fallback for legacy global messages (or default room)
                // NOTE: We relaxed roomId check to allow legacy (null) messages for backward compatibility if needed, 
                // but ideally we filter by room.
                query = `SELECT * FROM messages WHERE isGlobal = 1 AND (roomId IS NULL OR roomId = "") AND timestamp >= ? ORDER BY timestamp ASC LIMIT 100;`;
                params = [threeHoursAgo];
            }
        } else {
            // Private messages - typically fetched via getPrivateChats but kept here for fallback or specific checks
            query = `SELECT * FROM messages WHERE isGlobal = 0 AND timestamp >= ? ORDER BY timestamp ASC LIMIT 100;`;
            params = [threeHoursAgo];
        }

        try {
            const res = await this.db.query(query, params);
            return (res.values || []).map((m: any) => ({
                ...m,
                isGlobal: undefined // Clean up type for app
            }));
        } catch (err) {
            console.error('Error fetching messages from SQLite:', err);
            return [];
        }
    }

    async clearMessages() {
        if (!this.db) await this.initialize();
        if (!this.db) return;

        try {
            await this.db.run('DELETE FROM messages;', []);
        } catch (err) {
            console.error('Error clearing messages from SQLite:', err);
        }
    }

    async getPrivateChats(currentUserId: string): Promise<{ peerId: string; messages: Message[] }[]> {
        await this.purgeOldMessages();
        if (!this.db) return [];

        try {
            const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
            const res = await this.db.query(
                `SELECT * FROM messages WHERE isGlobal = 0 AND timestamp >= ? ORDER BY timestamp ASC;`,
                [threeHoursAgo]
            );

            const messages = (res.values || []).map((m: any) => ({
                id: m.id,
                text: m.text,
                senderId: m.senderId,
                senderAlias: m.senderAlias,
                senderGender: m.senderGender,
                timestamp: m.timestamp,
                recipientId: m.recipientId
            })) as Message[];

            // Group by peer ID
            const chatMap = new Map<string, Message[]>();
            for (const msg of messages) {
                const peerId = msg.senderId === currentUserId ? msg.recipientId! : msg.senderId;
                if (!chatMap.has(peerId)) {
                    chatMap.set(peerId, []);
                }
                chatMap.get(peerId)!.push(msg);
            }

            return Array.from(chatMap.entries()).map(([peerId, msgs]) => ({
                peerId,
                messages: msgs
            }));
        } catch (err) {
            console.error('Error loading private chats from SQLite:', err);
            return [];
        }
    }
}

export const sqliteService = new SQLiteService();
