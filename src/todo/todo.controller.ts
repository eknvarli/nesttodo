import { Controller, Get, Post, Body, Param, Res, Redirect, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import express from 'express';

@Controller()
export class TodoController {
    constructor(private readonly todoService: TodoService) {
    }

    @Get()
    async index(@Res() res: express.Response) {
        const todos = await this.todoService.findAll();
        res.render('index', {todos});
    }

    @Post('todos')
    async create(@Body('title') title: string, @Res() res: express.Response) {
        await this.todoService.create(title);
        res.redirect('/');
    }

    @Post('todos/:id')
    async modify(@Param('id') id: number, @Body() body: any, @Res() res: express.Response) {
        const method = body._method;
        if (method === 'PATCH') {
            await this.todoService.update(id, body.completed === 'true');
        } else if (method === 'DELETE') {
            await this.todoService.remove(id);
        }
        res.redirect('/');
    }
}
