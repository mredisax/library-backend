import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
//import { AuthModule } from './auth/auth.module';
@Module({
  
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    //AuthModule,
    BookModule,
    AuthorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
