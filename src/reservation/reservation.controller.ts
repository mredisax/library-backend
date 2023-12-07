import { Controller, Post, Body } from '@nestjs/common';
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

}
