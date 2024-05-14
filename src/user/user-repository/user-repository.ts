import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Logger } from 'winston';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {
    this.logger.info('Create user repository...');
  }

  async save(firstName: string, lastName?: string): Promise<User> {
    this.logger.info(`Create user with first name: ${firstName} and last name: ${lastName}`);
    return this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
  }
}
