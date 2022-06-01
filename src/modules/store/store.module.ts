/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controller/product.controller';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Product,
    ])],
    providers: [
        ProductService,
    ],
    controllers: [
        ProductController,
    ],
})
export class StoreModule {}
