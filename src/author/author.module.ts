import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Book } from '../book/book.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    TypeOrmModule.forFeature([Book]),
  ],
  providers: [AuthorService],
  controllers: [AuthorController]
  
})
export class AuthorModule {}
