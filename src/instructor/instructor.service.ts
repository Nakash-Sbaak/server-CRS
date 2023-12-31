import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class InstructorService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll() {
    return await this.prismaService.instructor.findMany();
  }
}
