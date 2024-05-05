import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Res,
  Req,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Redirect,
  Inject,
  Optional,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { Connection } from './connection/connection';
import { MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';

@Controller('/api/user')
export class UserController {
  // Constructor based injection : ini yang direkomendasikan
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    @Inject('EmailService') private emailService: MailService,
    private userRepository: UserRepository,
  ) {}

  // Property based injection
  // @Inject()
  // @Optional() // jika ingin optional
  // private service: UserService;

  @Post()
  post(): string {
    return 'post user';
  }

  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }

  @Get('/connection')
  async getConnection(): Promise<string> {
    this.userRepository.save();
    this.mailService.send();
    this.emailService.send();
    return this.connection.getName();
  }

  // @Get('/sample-response')
  // sampleResponse(@Res() res: Response) { // express http response
  //     res.status(200).json({
  //         data: 'Hello World!',
  //     });
  // }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    // express http response
    return {
      data: 'Hello World!',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return { url: '/api/user/sample-response', statusCode: 301 };
  }

  // @Get('/detail/:id')
  // getDeatailUser(@Req() req: Request): string { // menggunakan express request
  //     return `get user ${req.params.id}`;
  // }

  @Get('/detail/:id')
  getUserParam(@Param('id') id: string): string {
    // menggunakan decorator
    return `Param: ${id}`;
  }

  // ex: api/user/query?names=Al
  @Get('/query')
  getUserQuery(@Query('names') names: string): string {
    return `Query: ${names || 'Guest'} `;
  }

  // ex: api/user/multi-query?first_name=Al&last_name=Riansyah
  @Get('/multi-query')
  getMultiQuery(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): string {
    return `Query: ${firstName || ''} ${lastName || ''}`;
  }

  @Get('/sample')
  get(): string {
    return 'get user sample';
  }

  // Support async
  @Get('/async')
  async getAsync(first_name: string, last_name: string): Promise<string> {
    try {
      return `${first_name || ''} ${last_name || ''}`;
    } catch (error) {
      return error;
    }
  }

  // Management cookie
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success set cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() req: Request) {
    return req.cookies['name'];
  }

  // Management view
  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', { title: 'Hello Nest', name: name });
  }
}
