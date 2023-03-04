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

    async createToken(document, email, image, roles: string[]) {
        const user: JwtPayload = {
          document: document,
          email: email,
          image: image,
          roles: roles,
        };
        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload):  Promise<any>{
      return payload;
      // return await this.accountService.findOneByUsername(payload.document);
    }
}
