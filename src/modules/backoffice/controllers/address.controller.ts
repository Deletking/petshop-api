/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateaAddressContract } from '../contracts/address/create-address.contract';
import { AddressType } from '../enums/address-type.enum';
import { Address } from '../models/address.model';
import { Result } from '../models/result.model';
import { AddressService } from '../services/address.service';


// localhost:3000/customers
@Controller('v1/addresses')
export class AddressController {

  constructor(
    private readonly service: AddressService
  ) { }


  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateaAddressContract()))
  async addBillingAddress(@Param('document') document, @Body() model: Address) {
    try {
      await this.service.create(document, model, AddressType.Billing);

      return new Result('Endereço de fatura atualizado.', true, model, null);
    } catch (error) {
      throw new HttpException(new Result('Não foi possível adicionar seu endereço.', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }
  
  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateaAddressContract()))
  async addShippingAddress(@Param('document') document, @Body() model: Address) {
    try {
      await this.service.create(document, model, AddressType.Shipping);

      return new Result('Endereço de entrega atualizado.', true, model, null);
    } catch (error) {
      throw new HttpException(new Result('Não foi possível adicionar seu endereço.', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }

  // @Get('search/:zipcode')
  // async search(@Param('zipcode') zipcode) {
  //   try {
  //     const response = await this.service.getAddressByZipCode(zipcode).toPromise();
  //     return new Result(null, true, response.data, null);
  //   } catch(error) {
  //     throw new HttpException(new Result('Não foi possível localizar seu enderaço', false, null, error), HttpStatus.BAD_REQUEST);
  //   }
  // }
}