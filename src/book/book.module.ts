import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Author } from '../author/author.entity';
import { Booking } from 'src/booking/booking.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    TypeOrmModule.forFeature([Author]),
    TypeOrmModule.forFeature([Booking])
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
