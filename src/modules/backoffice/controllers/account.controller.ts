/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Controller('v1/accounts')
export class AccountController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get('')
  @UseGuards(AuthGuard())
  findAll() {
    return [];
  }
}