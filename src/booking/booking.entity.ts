import { Entity, PrimaryGeneratedColumn,ManyToOne, Column, OneToOne, OneToMany, JoinTable, JoinColumn } from 'typeorm';

import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';

@Entity()

export class Booking {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    uid: string;

    @Column()
    borrowAt: Date;

    @Column()
    returnTo: Date;

    @Column({ nullable: true })
    returnedAt: Date;

    @Column({ default: false })
    wasReturned: boolean;

    @ManyToOne(type => Book)
    @JoinColumn()
    book: Book;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User; 

}   