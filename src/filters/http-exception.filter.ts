import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch()
export class CustomHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message 
        : 'Something went wrong';

    // Log the error
    console.error(exception);
    //get validation errors
    let validatorErrors;
    // Check if the exception is a BadRequestException with a response object
    if (
      exception instanceof HttpException &&
      exception.getStatus() === HttpStatus.BAD_REQUEST &&
      exception.getResponse()
    ) {
      // Access the array of error messages
      validatorErrors = exception.getResponse()
    }
       // Send the response
    response.status(status).json({
      errorFlag: true,
      statusCode: status,
      message: message,
      validatorErrors:validatorErrors?.message || undefined,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
