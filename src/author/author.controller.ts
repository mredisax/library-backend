import { Controller, Post, Get, Put, Delete, Body, Param  } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
@Controller('author')
export class AuthorController {

    constructor(private readonly authorService: AuthorService) {}

    @Post()
    async create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
    }

    @Get()
    async findAll(): Promise<Author[]> {
        return this.authorService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Author> {
        return this.authorService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<string> {
        return this.authorService.remove(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() author: Author): Promise<string> {
        return this.authorService.update(id, author);
    }



}
