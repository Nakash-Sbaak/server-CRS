import { Controller, Get, UseGuards } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Serialize } from 'src/Interceptor/serialize.interceptor';
import { InstructorSerializer } from './dto/instructor.dto';

@Controller('instructor')
@Serialize(InstructorSerializer)
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get('/all')
  @UseGuards(AuthGuard, new RoleGuard(Role.Instructor))
  async getALl() {
    return await this.instructorService.getAll();
  }
}
