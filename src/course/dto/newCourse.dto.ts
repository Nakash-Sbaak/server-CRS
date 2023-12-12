import { Type } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class NewCourseDTO {
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @MinLength(4, {
    message: i18nValidationMessage('validation.MIN_LENGTH', { constraint: 4 }),
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  course_code: string;

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  name: string;

  @IsInt({ message: i18nValidationMessage('validation.IS_INT') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  instructor_id: number;

  @IsEnum(Type)
  type: Type;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsInt({ message: i18nValidationMessage('validation.IS_INT') })
  @Min(1, {
    message: i18nValidationMessage('validation.MIN', { constraint: 1 }),
  })
  @Max(4, {
    message: i18nValidationMessage('validation.MAX', { constraint: 4 }),
  })
  credits: number;
}
