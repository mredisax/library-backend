import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';
import { CreateReturnDto } from './dto/create-return.dto';

@Injectable()
export class BookingService {

    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,

        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

    ) { }

    async create(booking: CreateBookingDto): Promise<any> {
        const borrowDate = new Date();
        const returnDate = new Date();
        returnDate.setMonth(returnDate.getMonth() + 1);
        const user = await this.userRepository.findOne({ where: { id: booking.userId } });
        const books = await this.bookRepository.findByIds(booking.booksId);
        const uid = uuidv4();
    
        if (!user) {
            throw new Error("User not found");
        }
        if (!books) {
            throw new Error("Book not found");
        }
    
        const newBooking = [];
        for (const book of books) {
            const isAvailable = await this.checkAvailability(book.id);
            if (isAvailable) {
                console.log("isAvailable");
                let b = await this.bookingRepository.create({
                    uid: uid,
                    book: book,
                    user: user,
                    borrowAt: borrowDate,
                    returnAt: returnDate,
                });
                newBooking.push(b);
            }
        }
        return await this.bookingRepository.save(newBooking);
    }
    

    async checkAvailability(bookId: number): Promise<any>{
            const booking = await this.bookingRepository.createQueryBuilder("booking")
            .where("booking.book.id = :bookId", { bookId: bookId })
            .andWhere("booking.wasReturned = :wasReturned", { wasReturned: false })
            .getOne();
            return booking ? false : true;
        }

    async return(returnDto: CreateReturnDto): Promise<any> {
        const returnDate = new Date();
        const booking = await this.bookingRepository.createQueryBuilder("booking")
        .where("booking.id = :id", { id: returnDto.bookingId })
        .leftJoinAndSelect("booking.book", "book")
        .leftJoinAndSelect("booking.user", "user")
        .getOne();
        console.log(booking);
        const book = await this.bookRepository.findOne({ where: { id: booking.book.id } });
        const user = await this.userRepository.findOne({ where: { id: booking.user.id } });
        
        if (!book) {
            throw new Error("Book not found");
        }
        if (!user) {
            throw new Error("User not found");
        } 
        
        booking.returnAt = returnDate;
        booking.wasReturned = true;

        return await this.bookingRepository.save(booking);
    }

    async prolong(booking: Booking): Promise<any> {
        const returnDate = new Date();
        returnDate.setMonth(returnDate.getMonth() + 1);
        const book = await this.bookRepository.findOne({ where: { id: booking.book.id } });
        const user = await this.userRepository.findOne({ where: { id: booking.user.id } });
        if (!book) {
            throw new Error("Book not found");
        }
        if (!user) {
            throw new Error("User not found");
        }
        booking.returnAt = returnDate;
        return await this.bookingRepository.save(booking);
    }
    
}