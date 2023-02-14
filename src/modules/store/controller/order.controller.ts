/* eslint-disable prettier/prettier */
import { Controller, Get, Param, HttpException, HttpStatus, Post, Body } from '@nestjs/common';
import { ProductService } from './../services/product.service';
import { OrderService } from './../services/order.service';
import { Result } from './../../backoffice/models/result.model';
import { OrderItemDto } from '../dtos/order-item.dto';


@Controller('v1/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    // private readonly orderItemService: OrderItemService,
    private readonly productService: ProductService
  ) {}

  @Get(':order')
  async get(@Param('order') order: string) {
    try {
      const orders = await this.orderService.getByCustomer(order);
      return new Result(null, true, orders, null)
    } catch (error){
      throw new HttpException(new Result('Não foi possivel listar os pedidos.', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }
  
  @Get(':customer')
  async getByCustomer(@Param('customer') customer: string) {
    try {
      const orders = await this.orderService.getByCustomer(customer);
      return new Result(null, true, orders, null)
    } catch (error){
      throw new HttpException(new Result('Não foi possivel listar os pedidos.', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }
  // @Post()
  // async post(@Body() model: OrderItemDto[]) {

  // }
}