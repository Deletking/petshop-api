/* eslint-disable prettier/prettier */
import { AccountService } from './../../modules/backoffice/services/account.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService
    ) {}

    async createToken() {
        const user: JwtPayload = {username: 'teste@email.com'};
        const accessToken = this.jwtService.sign(user);
        return {
          expiresIn: 3600,
          accessToken,
        }
    }

    async validateUser(payload: JwtPayload):  Promise<any>{
      return await this.accountService.findOneByUsername(payload.username);
    }
}
