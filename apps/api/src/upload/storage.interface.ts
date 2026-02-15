export abstract class StorageService {
    abstract save(userId: string, buffer: Buffer, mimeType: string): Promise<string>;
    abstract delete(userId: string): Promise<void>;
}
