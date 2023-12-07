import { Controller, Post, Body } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';
import { CreateReturnDto } from './dto/create-return.dto';
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
    async prolong(@Body() booking: Booking) {
        return this.bookingService.prolong(booking);
    }

}
