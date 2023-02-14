/* eslint-disable prettier/prettier */
import { Order } from './../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly repository: Repository<Order>,
  ) {}

  async getByNumber(number: string): Promise<Order> {
    return await this.repository.findOne({where:{ number: number }});
  }

  async getByCustomer(customer: string): Promise<Order[]> {
    return await this.repository.find({ where: { customer: customer }});
  }

  async post(order: Order) {
    await this.repository.save(order);
  }
}