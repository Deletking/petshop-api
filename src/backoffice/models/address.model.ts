/* eslint-disable prettier/prettier */
export class Address {
  constructor(
    public zipCode: string,
    public street: string,
    public number: string,
    public complemnet: string,
    public neighborhood: string,
    public city: string,
    public state: string,
    public country: string,
  ) { }
}