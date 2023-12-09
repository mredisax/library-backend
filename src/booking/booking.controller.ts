import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';
import { CreateReturnDto } from './dto/create-return.dto';
import { CreateProlongDto } from './dto/create-prolongation.dto';
@Controller('booking')
export class BookingController {

    constructor(private readonly bookingService: BookingService) {}

    @Post()
    async create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingService.create(createBookingDto);
    }

    @Post('return')
    async return(@Body() booking: CreateReturnDto) {
        return this.bookingService.return(booking);
    }

    @Post('prolong')
    async prolong(@Body() booking: CreateProlongDto) {
        return this.bookingService.prolong(booking);
    }

    @Get('book/:bookId')
    async findAll(@Param('bookId') bookId: number): Promise<Booking[]> {
        return this.bookingService.getBookingByBook(bookId);
    }

    @Get('user/:userId')
    async findAllByUser(@Param('userId') userId: number): Promise<Booking[]> {
        return this.bookingService.getBookingByUser(userId);
    }


}
