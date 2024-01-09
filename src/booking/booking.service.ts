import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';
import { CreateReturnDto } from './dto/create-return.dto';
import { CreateProlongDto } from './dto/create-prolongation.dto';
import { Reservation } from 'src/reservation/reservation.entity';

@Injectable()
export class BookingService {

    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,

        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,

    ) { }

    async create(booking: CreateBookingDto): Promise<any> {
        const borrowDate = new Date();
        const returnDate = new Date();
        returnDate.setMonth(returnDate.getMonth() + 1);
        const user = await this.userRepository.findOne({ where: { id: booking.userId } });
        const books = await this.bookRepository.findByIds(booking.booksId);
        const uid = uuidv4();
    
        if (!user) {
            return "User not found";
        }
        if (!books) {
            return "Book not found";
        }
    
        const newBooking = [];
        for (const book of books) {
            const isAvailable = await this.checkAvailability(book.id);
            const isReserved = await this.checkReservation(book.id, booking.userId);
            if(!isAvailable || isReserved) {
                return "Book is not available"
                
            }
            if (isAvailable && !isReserved) {
                let b = await this.bookingRepository.create({
                    uid: uid,
                    book: book,
                    user: user,
                    borrowAt: borrowDate,
                    returnTo: returnDate,
                });
                newBooking.push(b);
                await this.removeReservation(book.id);
            }
        }
        return await this.bookingRepository.save(newBooking);
    }
    
    async checkReservation(bookId: number, userId: number): Promise<any> {
        const reservation = await this.reservationRepository.createQueryBuilder("reservation")
        .where("reservation.book.id = :bookId", { bookId: bookId })
        .leftJoinAndSelect("reservation.user", "user")
        .getOne();
        console.log(userId);
        //check if reservation is
        if(reservation) {
            if(reservation.user.id == userId) {
                return false;
            } else {
                return true;
            }
        }
    }

    async checkAvailability(bookId: number): Promise<any>{
            const booking = await this.bookingRepository.createQueryBuilder("booking")
            .where("booking.book.id = :bookId", { bookId: bookId })
            .andWhere("booking.wasReturned = :wasReturned", { wasReturned: false })
            .getOne();
            return booking ? false : true;
    }

    async removeReservation(bookId: number): Promise<any> {
        await this.reservationRepository.delete({ book: { id: bookId } });
        return "Reservation deleted";
    }

    async return(returnDto: CreateReturnDto): Promise<any> {
        const returnDate = new Date();
        const booking = await this.bookingRepository.createQueryBuilder("booking")
        .where("booking.id = :id", { id: returnDto.bookingId })
        .leftJoinAndSelect("booking.book", "book")
        .leftJoinAndSelect("booking.user", "user")
        .getOne();

        const book = await this.bookRepository.findOne({ where: { id: booking.book.id } });
        const user = await this.userRepository.findOne({ where: { id: booking.user.id } });
        
        if (!book) {
            throw new Error("Book not found");
        }
        if (!user) {
            throw new Error("User not found");
        } 
        
        booking.returnedAt = returnDate;
        booking.wasReturned = true;

        return await this.bookingRepository.save(booking);
    }

    async prolong(prolongDto: CreateProlongDto): Promise<any> {
        const booking = await this.bookingRepository.createQueryBuilder("booking")
            .where("booking.id = :id", { id: prolongDto.bookingId })
            .leftJoinAndSelect("booking.book", "book")
            .leftJoinAndSelect("booking.user", "user")
            .getOne();
    
        if (!booking) {
            throw new Error("Booking not found");
        }
    
        const currentDate = new Date();
        const timeDifference = booking.returnTo.getTime() - currentDate.getTime();

        if (timeDifference < 1209600000) {
            const newReturnDate = new Date(booking.returnTo);
            newReturnDate.setMonth(newReturnDate.getMonth() + 1);
    
            booking.returnTo = newReturnDate;
            return await this.bookingRepository.save(booking);
        } else {
            return "You can prolong only if you have less than 14 days to return";
        }
    }
    
    async getBookingByUser(userId: number): Promise<any> {
        return await this.bookingRepository.createQueryBuilder("booking")
        .where("booking.user.id = :userId", { userId: userId })
        .leftJoinAndSelect("booking.book", "book")
        .leftJoinAndSelect("booking.user", "user")
        .getMany();
    }

    async getBookingByBook(bookId: number): Promise<any> {
        return await this.bookingRepository.createQueryBuilder("booking")
        .where("booking.book.id = :bookId", { bookId: bookId })
        .leftJoinAndSelect("booking.book", "book")
        .leftJoinAndSelect("booking.user", "user")
        .getMany();
    }

}