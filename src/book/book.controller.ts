import { Controller, Post, Get, Put, Delete, Body, Param  } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Author } from '../author/author.entity';
@Controller('book')
export class BookController {

    constructor(private readonly bookService: BookService) {}

    @Post()
    async create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

    @Get()
    async findAll(): Promise<Book[]> {
        return this.bookService.findAll();

    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Book> {
        return this.bookService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<string> {
        return this.bookService.remove(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() book: Book): Promise<string> {
        return this.bookService.update(id, book);
    }

}
