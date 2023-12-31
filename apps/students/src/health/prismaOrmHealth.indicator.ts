import { PrismaService } from './../repository/app.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';

@Injectable()
export class PrismaOrmHealthIndicator extends HealthIndicator {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async pingCheck(databaseName: string): Promise<any> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return this.getStatus(databaseName, true);
    } catch (e) {
      throw new InternalServerErrorException('Prisma check failed', e);
    }
  }
}
