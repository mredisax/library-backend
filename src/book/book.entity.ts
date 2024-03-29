import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Author } from '../author/author.entity';
import { Booking } from '../booking/booking.entity';
@Entity()

export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    uid: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column()
    year: number;

    @Column()
    isbn: string;

    @Column({ nullable: true })
    cover: string;

    @ManyToOne(() => Author, author => author.books)
    @JoinTable()
    author: Author;
}   