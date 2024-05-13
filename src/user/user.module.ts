import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  Connection,
  createConnection,
  MongoDBConnection,
  MySqlConnection,
} from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    // {
    //   // Class provider
    //   provide: Connection,
    //   useClass:
    //     process.env.DATABASE == 'mysql' ? MySqlConnection : MongoDBConnection,
    // },
    {
      // Factory provider
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      // Value provider
      provide: MailService,
      useValue: mailService,
    },
    {
      // Alias provider
      provide: 'EmailService',
      useExisting: MailService,
    },
    UserRepository,
    MemberService,
  ],
  exports: [UserService],
})
export class UserModule {}
