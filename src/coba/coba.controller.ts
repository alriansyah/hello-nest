import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('/api/coba')
export class CobaController {
    @Post()
    post(): string {
        return 'post user';
    }

    @Get()
    getCoba(): string {
        return 'get user';
    }
    @Get("/sample")
    get(): string {
        return 'get user sample';
    }

    @Put()
    put(): string {
        return 'put user';
    }
}
