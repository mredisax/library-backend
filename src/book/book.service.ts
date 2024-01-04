import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { Author } from '../author/author.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
    ) { }

    async findAllWithAutors(): Promise<Book[]> {
        //return books with its authors
        return await this.bookRepository.find({ relations: ["author"], order: { title: "ASC" } });
    }

    async findOneWithAutors(id: number): Promise<Book> {
        return await this.bookRepository.findOne({ relations: ["author"] , where: { id: id }});
    }

    async create(book: CreateBookDto): Promise<Book> {
        
        const author = await this.authorRepository.findOne({where: {id: book.author}});
        
        const newBook = this.bookRepository.create({
            title: book.title,
            description: book.description,
            category: book.category,
            year: book.year,
            isbn: book.isbn,
            uid: uuidv4(),
            author: author,
            cover: book.cover
    });
    return await this.bookRepository.save(newBook);
    }

    async remove(id: number): Promise<string> {
        let deleted = await this.bookRepository.delete(id);
        if (deleted.affected === 0) {
            throw new Error("Book not found");
        } else {
            return "Book deleted";
        }
    }

    async update(id: number, book: Book): Promise<string> {
        let updated = await this.bookRepository.update(id, book);
        if (updated.affected === 0) {
            throw new Error("Book not found");
        } else {
            return "Book updated";
        }
    }

}
