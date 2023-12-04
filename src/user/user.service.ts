import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>){}
    
    async findAll(): Promise<User[]>{
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User>{
        return this.userRepository.findOne({where: {id}});
    }
    
    async findOneByEmail(email:string):Promise<User>{
        return this.userRepository.findOne({where: {email}})
    }

    async register(user: Partial<User>): Promise<User>{
        const salt = await bcrypt.genSalt(10)
        user.password=await bcrypt.hash(user.password, salt);
        const newuser= this.userRepository.create(user);
        return this.userRepository.save(newuser)
    }

    async update(id: number, user: Partial<User>): Promise<User> {
        if(user.password){
            const salt = await bcrypt.genSalt(10)
            user.password=await bcrypt.hash(user.password, salt);
        }
        await this.userRepository.update(id, user);
        return this.userRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
    
}
