import { RoomRepository } from './repositories/room.repository';
import { AgendaController } from './Controllers/agenda.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BookRoomService } from './services/book-room.service';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [AgendaController],
  providers: [
    BookRoomService,
    RoomRepository,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class AgendaModule {}
