import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class CustomHttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
