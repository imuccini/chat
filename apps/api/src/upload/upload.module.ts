import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller.js';
import { StorageService } from './storage.interface.js';
import { DiskStorageService } from './disk-storage.service.js';

@Module({
    controllers: [UploadController],
    providers: [
        {
            provide: StorageService,
            useClass: DiskStorageService,
        },
    ],
})
export class UploadModule {}
