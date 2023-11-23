import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDataDto, EditUserPasswordDto } from './dtos/user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private usersService: UserService) { }

    @Get('/')
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException("User with id:${id} does not exist!")
        } else {
            return user;
        }
    }


    // @Post('/email')
    // async findByEmail(@Body() data: any){
    //     const user = await this.usersService.findOneByEmail(data.mail)
    //     if (!user) {
    //         throw new NotFoundException("User with email ${data.mail} does not exist!")
    //     } else {
    //         return user;
    //     }
    // }

    @Post('/register')
    async register(@Body() user: CreateUserDto) {
        return this.usersService.register(user);
    }

    @Put('/password')
    async updatePassword(@Body() dto:EditUserPasswordDto ): Promise<any> {
        return this.usersService.update(dto.id, dto);
    }

    @Put('/')
    async update(@Body() dto:EditUserDataDto): Promise<any>{
        return this.usersService.update(dto.id,dto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<any>{
        const user= await this.usersService.findOne(id);
        if(!user){
            throw new NotFoundException("User with id:${id} does not exist!");
        }
        return this.usersService.delete(id);
    }
}