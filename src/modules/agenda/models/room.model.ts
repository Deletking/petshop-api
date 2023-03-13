/* eslint-disable prettier/prettier */
import { RoomBookedEvent } from './../events/room-booked.event';
import { AggregateRoot } from "@nestjs/cqrs";


export class Room extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  book(customerId: string, data: Date) {
    this.apply(new RoomBookedEvent(customerId, this.id));
  }
}