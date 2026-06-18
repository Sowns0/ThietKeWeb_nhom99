    import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    } from '@nestjs/common';

    import { SachService } from './sach.service';

    @Controller('sach')
    export class SachController {
    constructor(
        private readonly sachService: SachService,
    ) {}

    @Get()
    findAll() {
        return this.sachService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.sachService.findOne(Number(id));
    }

    @Post()
    create(@Body() body: any) {
        return this.sachService.create(body);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() body: any,
    ) {
        return this.sachService.update(
        Number(id),
        body,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sachService.remove(
        Number(id),
        );
    }
    }