import { PrismaService } from './../repository/app.repository';
import { Injectable } from '@nestjs/common';
import { Log } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  saveAuditLog(data: string): Promise<Log> {
    return this.prismaService.log.create({
      data: {
        message: data,
      },
    });
  }
}
