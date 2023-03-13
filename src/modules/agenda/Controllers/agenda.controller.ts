import { JwtAuthGuard } from './../../../shared/guards/auth.guard';
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { BookRoomDto } from '../dtos/book-rooom.dto';
import { BookRoomService } from './../services/book-room.service';
import { BookRoomCommand } from '../commands/book-room.command';
import { Result } from 'src/modules/backoffice/models/result.model';



@Controller('v1/rooms')
export class AgendaController {
  constructor(private readonly service: BookRoomService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async Book(@Req() request, @Body() model: BookRoomDto) {
   try {
      const command = new BookRoomCommand(request.user.document, model.roomId, model.date);
      await this.service.Book(command);
   } catch (error) {
      throw new HttpException(new Result('Não foi possível reservar sua sala.', false, null, error), HttpStatus.BAD_REQUEST);
   }
  }
}