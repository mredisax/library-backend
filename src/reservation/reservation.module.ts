import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
  imports: [TypeOrmModule.forFeature([Reservation, Book, User])]

})
export class ReservationModule {}
