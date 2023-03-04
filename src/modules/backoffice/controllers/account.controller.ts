/* eslint-disable prettier/prettier */
import { JwtAuthGuard } from './../../../shared/guards/auth.guard';
import { AccountService } from './../services/account.service';
import { HttpStatus, Req, UseGuards } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Body, } from '@nestjs/common';
import { Controller, Post, } from "@nestjs/common";
import { AuthService } from "src/shared/services/auth.service";
import { Result } from '../models/result.model';
import { AuthenticateDto } from '../dtos/account/authenticate.dto';
import { ResetPasswordDto } from '../dtos/account/reset-password.dto';
import { Guid } from 'guid-typescript';
import { ChangePasswordDto } from '../dtos/account/change-password.dto';
@Controller('v1/accounts')
export class AccountController {
  
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService
    ) {}

  @Post('authenticate')
  async  authenticate(@Body() model: AuthenticateDto): Promise<any> {
      const customer = await this.accountService.autheticate(model.username, model.password);

      if(!customer)
        throw new HttpException(new Result('Usuário ou senha inválidos', false, null, null), HttpStatus.NOT_FOUND);

      if(!customer.user.active)
        throw new HttpException(new Result('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);

      const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
      return new Result(null, true, token, null);
  }

  @Post('reset-password')
  async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
    try {
      const password = Guid.create().toString().substring(0, 8).replace('-', '');
      await this.accountService.update(model.document, { password: password});
      return new Result('Uma nova senha foi enviada para seu E-mail', true, null, null);
    } catch (error) {
      throw new HttpException(new Result('Não foi possível restaurar sua senha', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
    try {
      await this.accountService.update(request.user.document, {password: model.newPassword});
      return new Result('Sua senha foi alterada com sucesso!', true, null, null);
    } catch(error) {
      throw new HttpException(new Result('Não foi possível alterar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
    }
    
  }

  @Post('refresh')
  async refreshToken(@Req() request): Promise<any> {
    const token = await this.authService.createToken(request.user.document, request.user.email, request.user.image, request.user.roles);
    return new Result(null, true, token, null);
  }
}
