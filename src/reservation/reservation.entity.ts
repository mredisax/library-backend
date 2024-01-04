import { Entity, PrimaryGeneratedColumn, Column, OneToOne,ManyToOne, OneToMany, JoinTable, JoinColumn } from 'typeorm';

import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';

@Entity()

export class Reservation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    uid: string;

    @Column()
    reservedAt: Date;

    @ManyToOne(type => Book)
    @JoinColumn()
    book: Book;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User; 

}   