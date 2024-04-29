import {
    Controller,
    Get,
    Post,
    Put,
    Param,
    Query,
    Res,
    Header,
    HttpCode,
    HttpRedirectResponse,
    Redirect,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('/api/user')
export class UserController {
    @Post()
    post(): string {
        return 'post user';
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

    @Put()
    put(): string {
        return 'put user';
    }
}
