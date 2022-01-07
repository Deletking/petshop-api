/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ValidatorIterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer.contracts';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';

// localhost:3000/customers
@Controller('v1/customers')
export class CustomerController {
  @Get()
  get() {
    return new Result(null, true, [], null)
  }

  @Get(':document')
  getById(@Param('document') document) {
    return new Result(null, true, { document }, null)
  }

  @Post()
  @UseInterceptors(new ValidatorIterceptor(new CreateCustomerContract()))
  post(@Body() body: Customer) {
    return new Result('Cliente cadastrado com sucesso!', true, body, null)
  }

  @Put(':document')
  put(@Param('document') document, @Body() body) {
    return new Result('Cliente alterado com sucesso!', true, body, null)
  }

  @Delete(':document')
  delete(@Param('document') document) {
    return new Result('Cliente removido com sucesso!', true, null, null)
  }
}