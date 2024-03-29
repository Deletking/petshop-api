/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/common/cache';
import { Md5 } from 'md5-typescript';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCreditCardCustomerContract } from '../contracts/customer/create-credit-card.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contract';
import { QueryContract } from '../contracts/query.contract';
import { CreateCustomerDto } from '../dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { QueryDto } from '../dtos/query.dto';
import { CreditCard } from '../models/credit-card.model';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

// localhost:3000/customers
@Controller('v1/customers')
export class CustomerController {

  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService
  ) { }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAll() {
    const customersResponse = await this.customerService.findAll();
    return new Result('Todos os clientes.', true, customersResponse, null);
  }

  @Get(':document')
  async getCustomerDetails(@Param('document') document) {
    const customerResponse = await this.customerService.find(document);
    return new Result('Detalhes do cliente.', true,  customerResponse, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    try {
      const password = await Md5.init(`${model.password}${process.env.SALT_KEY}`);
      const user =  await this.accountService.create(
        new User(model.document, password, true, ['user'])
      );
      const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
      const customerResponse = await this.customerService.create(customer);
  
      return new Result('Cliente criado com sucesso!', true, customerResponse, null);
    } catch (error) {
      throw new HttpException(new Result('Não foi possível realizar seu cadastro.', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract))
  async update(@Param('document') document, @Body() model: UpdateCustomerDto) {
    try {
      await this.customerService.update(document, model);
      return new Result('Cliente atualizado com sucesso.', true, model, null);
    } catch  (error) {
      throw new HttpException(new Result('Não foi possível atualizar o cliente.', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }


  @Post('query')
  @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
  async query(@Body() model: QueryDto) {
    try {
      const customersResponse = await this.customerService.query(model);

      return new Result(`Lista de clientes de ${model.skip} até ${model.take}`, true, customersResponse, null);
    } catch (error) {
      throw new HttpException(new Result('Não foi possível adicionar seu endereço.', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(':document')
  delete(@Param('document') document) {
    return new Result('Cliente removido com sucesso!', true, document, null);
  }

  @Post(':document/credit-cards')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardCustomerContract()))
  async createBillig(@Param('document') document, @Body() model: CreditCard) {
    try {
      await this.customerService.saveOrUpdateCreditCard(document, model);
  
      return new Result('Cartão cadastrado com sucesso!', true, model, null);
    } catch (error) {
      throw new HttpException(new Result('Não foi possível cadastrar o seu cartão.', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }

}