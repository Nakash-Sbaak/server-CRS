import {
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Serialize } from 'src/Interceptor/serialize.interceptor';
import { InstructorSerializer } from './dto/instructor.serializer';
import { LoggedInInstructor } from './logged-in-instructor.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('instructor')
@Serialize(InstructorSerializer)
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get('/all')
  @UseGuards(AuthGuard, new RoleGuard(Role.Instructor))
  async getALl() {
    return await this.instructorService.getAll();
  }

  @Post('/upload-students')
  @UseGuards(AuthGuard, new RoleGuard(Role.Instructor))
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async uploadStudents(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.instructorService.uploadStudents(file);
  }
}
