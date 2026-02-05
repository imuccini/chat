import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        // Extract tenantId from headers or user object (set by AuthGuard/WsAuth)
        const tenantId = req.headers['x-tenant-id'] || req.user?.tenantId;
        req.tenantContext = { tenantId };
        return next.handle();
    }
}
