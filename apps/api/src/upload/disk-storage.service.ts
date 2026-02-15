import { Injectable, Logger } from '@nestjs/common';
import { StorageService } from './storage.interface.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir, writeFile, readdir, unlink } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class DiskStorageService extends StorageService {
    private readonly logger = new Logger('DiskStorageService');
    private readonly uploadsDir = join(__dirname, '../../uploads/avatars');

    async save(userId: string, buffer: Buffer, mimeType: string): Promise<string> {
        await mkdir(this.uploadsDir, { recursive: true });

        // Remove any existing avatar for this user
        await this.deleteExisting(userId);

        const ext = mimeType === 'image/png' ? 'png' : 'jpg';
        const filename = `${userId}.${ext}`;
        const filePath = join(this.uploadsDir, filename);

        await writeFile(filePath, buffer);
        this.logger.log(`Saved avatar for user ${userId}: ${filename}`);

        return `/api/uploads/avatars/${filename}`;
    }

    async delete(userId: string): Promise<void> {
        await this.deleteExisting(userId);
    }

    private async deleteExisting(userId: string): Promise<void> {
        try {
            const files = await readdir(this.uploadsDir);
            for (const file of files) {
                if (file.startsWith(`${userId}.`)) {
                    await unlink(join(this.uploadsDir, file));
                    this.logger.log(`Deleted old avatar: ${file}`);
                }
            }
        } catch {
            // Directory may not exist yet
        }
    }
}
