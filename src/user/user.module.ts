import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  Connection,
  MongoDBConnection,
  MySqlConnection,
} from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import {
  createRepository,
  UserRepository,
} from './user-repository/user-repository';
import * as process from 'process';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      // Class provider
      provide: Connection,
      useClass:
        process.env.DATABASE == 'mysql' ? MySqlConnection : MongoDBConnection,
    },
    {
      // Value provider
      provide: MailService,
      useValue: mailService,
    },
    {
      // Alias provider
      provide: 'EmailService',
      useExisting: MailService
    },
    {
      // Factory provider
      provide: UserRepository,
      useFactory: createRepository,
      inject: [Connection],
    },
  ],
})
export class UserModule {}
