/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './../entities/order-item.entity';
import { Repository } from 'typeorm';


@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly repository: Repository<OrderItem>
    ) {}
  

  async get(): Promise<OrderItem[]> {
    return await this.repository.find();
  }

  async post(orderItem: OrderItem) {
    await this.repository.save(orderItem);
  }
}