import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Author } from '../author/author.entity';
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

    @ManyToOne(type => Author, author => author.books)
    author: Author;
}   