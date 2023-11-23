import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    phone: string

    @Column()
    password: string;

    @Column({default: false})
    is_admin: boolean;

    //TODO: address_id: number;
}