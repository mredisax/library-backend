import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {

    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
    ) { }

    async findAll(): Promise<Author[]> {
        return await this.authorRepository.find();
    }

    async create(author: CreateAuthorDto): Promise<Author> {
        return await this.authorRepository.save(author);
    }

    async findOne(id: number): Promise<Author> {
        return await this.authorRepository.findOne({where: {id: id}});
    }

    async remove(id: number): Promise<string> {
        let deleted = await this.authorRepository.delete(id);
        if (deleted.affected === 0) {
            throw new Error("Author not found");
        }else{
            return "Author deleted";
        }
    }

    async update(id: number, author: Author): Promise<string> {
        let updated = await this.authorRepository.update(id, author);
        if (updated.affected === 0) {
            throw new Error("Author not found");
        }else{
            return "Author updated";
        }
    }

}
