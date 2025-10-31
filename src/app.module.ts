import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Todo} from "./todo/todo.entity";
import {TodoModule} from "./todo/todo.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'todo.db',
            entities: [Todo],
            synchronize: true,
        }),
        TodoModule,
    ],
})
export class AppModule {}
