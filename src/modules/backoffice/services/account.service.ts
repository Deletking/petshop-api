/* eslint-disable prettier/prettier */
import { Customer } from './../models/customer.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
    
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Customer') private readonly customerModel: Model<Customer>,
        ) {
    }

    async create(data: User): Promise<User> {
        const user = new this.userModel(data);
        return await user.save();
    }

    async update(username: string, data: any): Promise<User> {
        return await this.userModel.findOneAndUpdate({username}, data);
    }

    async autheticate(username, password): Promise<Customer> {
        return await this.customerModel.findOne(
            {
                'user.username': username,
                'user.password': password
            }
        )
        .populate('user', '-password')
        .exec();
    }
}