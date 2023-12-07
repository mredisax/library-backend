import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ReservationService {

    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,

        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

    ) { }

    async create(reservation: CreateReservationDto): Promise<any> {
        const reservedAt = new Date();
        const user = await this.userRepository.findOne({ where: { id: reservation.userId } });
        const book = await this.bookRepository.findOne({ where: { id: reservation.bookId } });
        const uid = uuidv4();
        
        
        if (!user) {
            throw new Error("User not found");
        }
        if (!book) {
            throw new Error("Book not found");
        }
        const newReservation = this.reservationRepository.create({
            uid: uid,
            book: book,
            user: user,
            reservedAt: reservedAt
        });

        return await this.reservationRepository.save(newReservation);
    }

    async findByBookId(bookId: number): Promise<any> {
        
        const reservation = this.reservationRepository.createQueryBuilder("reservation")
        .where("reservation.book.id = :bookId", { bookId: bookId })
        .getOne();
        return reservation;
    }

}
