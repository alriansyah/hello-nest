import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  Connection,
  createConnection,
} from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
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
