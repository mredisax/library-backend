import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';
import { Reservation } from 'src/reservation/reservation.entity';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [TypeOrmModule.forFeature([Booking, Book, User, Reservation])],
})
export class BookingModule {}
