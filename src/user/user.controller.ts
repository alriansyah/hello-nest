import { Controller, Get, Post, Put, Param, Query } from '@nestjs/common';

@Controller('/api/user')
export class UserController {
    @Post()
    post(): string {
        return 'post user';
    }

    // @Get('/detail/:id')
    // getDeatailUser(@Req() req: Request): string { // menggunakan express request
    //     return `get user ${req.params.id}`;
    // }

    @Get('/detail/:id')
    getUserParam(@Param('id') id: string): string { // menggunakan decorator
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
