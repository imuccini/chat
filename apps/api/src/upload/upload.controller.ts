import {
    Controller,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.interface.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('upload')
export class UploadController {
    private readonly logger = new Logger('UploadController');

    constructor(
        private readonly storageService: StorageService,
        private readonly prisma: PrismaService,
    ) {}

    @Post('avatar')
    @UseInterceptors(
        FileInterceptor('file', {
            limits: { fileSize: 500 * 1024 }, // 500KB
            fileFilter: (_req, file, cb) => {
                if (!file.mimetype.startsWith('image/')) {
                    cb(new BadRequestException('Only image files are allowed'), false);
                    return;
                }
                cb(null, true);
            },
        }),
    )
    async uploadAvatar(
        @Query('userId') userId: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!userId) {
            throw new BadRequestException('userId query parameter is required');
        }
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        // Verify user exists
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new BadRequestException('User not found');
        }

        // Save file to storage
        const imageUrl = await this.storageService.save(userId, file.buffer, file.mimetype);

        // Update user record in DB
        await this.prisma.user.update({
            where: { id: userId },
            data: { image: imageUrl },
        });

        this.logger.log(`Avatar uploaded for user ${userId}: ${imageUrl}`);

        return { imageUrl };
    }
}
