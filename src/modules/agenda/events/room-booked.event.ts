/* eslint-disable prettier/prettier */

export class RoomBookedEvent {
  constructor(
    public readonly customerId: string,
    public readonly roomId: string,
  ) {}
}