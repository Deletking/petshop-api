/* eslint-disable prettier/prettier */
import { CallHandler } from '@nestjs/common';
import { Result } from 'src/modules/backoffice/models/result.model';
import {
  ExecutionContext,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(public roles: string[]) { }

  intercept(context: ExecutionContext, call$: CallHandler): any {
    const payload: JwtPayload = context.switchToHttp().getRequest().user;
    console.log(payload);

    let hasRole = false;
    payload.roles.forEach((role) => {
      if (this.roles.includes(role))
        hasRole = true;
    });

    if (!hasRole) {
      throw new HttpException(
        new Result('Acesso não autorizado', false, null, null),
        HttpStatus.FORBIDDEN);
    }

    return call$;
  }
} 