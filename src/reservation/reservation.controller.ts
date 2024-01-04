import { Controller, Post, Body,Delete,Param,Get } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';

import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservation')
export class ReservationController {

    constructor(private readonly reservationService: ReservationService) {}

    @Post()
    async create(@Body() createReservationDto: CreateReservationDto) {
        return this.reservationService.create(createReservationDto);
    }   

    @Delete(":id")
    async remove(@Param('id') id: number): Promise<string> {
        return this.reservationService.remove(id);
    }

    @Get("user/:userId")
    async findAllByUser(@Param('userId') userId: number): Promise<Reservation[]> {
        return this.reservationService.getReservationByUser(userId);
    }

    @Get("book/:bookId")
    async findAllByBook(@Param('bookId') bookId: number): Promise<Reservation[]> {
        return this.reservationService.findByBookId(bookId);
    }

    @Get(":id")
    async findOne(@Param('id') id: number): Promise<Reservation> {
        return this.reservationService.findOne(id);
    }
    
}
