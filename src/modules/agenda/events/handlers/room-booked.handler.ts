/* eslint-disable prettier/prettier */
import { RoomBookedEvent } from './../room-booked.event';
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(RoomBookedEvent)
export class RoomBookedHandler 
  implements IEventHandler<RoomBookedEvent> {
  handle(event: RoomBookedEvent) {
      console.log('RoomBookEvent: Handle - Manipulando o evento Room Booked...');
  }
}