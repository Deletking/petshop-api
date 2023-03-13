/* eslint-disable prettier/prettier */
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ICommandHandler } from '@nestjs/cqrs/dist/interfaces';
import { RoomRepository } from '../../repositories/room.repository';
import { BookRoomCommand } from './../book-room.command';

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
  constructor(private readonly repository: RoomRepository) {}

  async execute(command: BookRoomCommand): Promise<any> {
      const room = await this.repository.checkAvailability(command.roomId, command.date);

      if (room) {
        room.book(command.customerId, command.date);
        await this.repository.book(room);
        return;
      }
      throw new HttpException('Sala não disponível', HttpStatus.BAD_REQUEST);
  }
}