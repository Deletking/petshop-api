/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from './product.entity';
import { Order } from "./order.entity";


@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (o) => o.items)
  order: Order;
  
  @ManyToOne(() => Order, (p) => p)
  product: Product;

  @Column('decimal')
  price: number;

  @Column('decimal')
  quantity: number;
}