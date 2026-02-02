import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Message } from '../types';

class SQLiteService {
    private sqlite: SQLiteConnection | null = null;
    private db: SQLiteDBConnection | null = null;
    private dbName: string = 'chat_cache';

    async initialize() {
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
            INSERT OR REPLACE INTO messages (id, text, senderId, senderAlias, senderGender, timestamp, recipientId, isGlobal)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const params = [
            msg.id,
            msg.text,
            msg.senderId,
            msg.senderAlias,
            msg.senderGender,
            msg.timestamp,
            msg.recipientId || null,
            isGlobal ? 1 : 0
        ];

        try {
            await this.db.run(query, params);
        } catch (err) {
            console.error('Error saving message to SQLite:', err);
        }
    }

    async getMessages(isGlobal: boolean = true, recipientId?: string): Promise<Message[]> {
        if (!this.db) await this.initialize();
        if (!this.db) return [];

        let query = '';
        let params: any[] = [];

        if (isGlobal) {
            query = `SELECT * FROM messages WHERE isGlobal = 1 ORDER BY timestamp ASC LIMIT 100;`;
        } else {
            query = `SELECT * FROM messages WHERE isGlobal = 0 AND (recipientId = ? OR senderId = ?) ORDER BY timestamp ASC LIMIT 100;`;
            params = [recipientId, recipientId];
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
        if (!this.db) await this.initialize();
        if (!this.db) return [];

        try {
            const res = await this.db.query(
                `SELECT * FROM messages WHERE isGlobal = 0 ORDER BY timestamp ASC;`,
                []
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
