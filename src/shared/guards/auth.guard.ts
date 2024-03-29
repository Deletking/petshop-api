/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';


@Injectable()
export class JwtAuthGuard extends AuthGuard() {
  canActivate(context: ExecutionContext) {
      return super.canActivate(context);
  }

  handleRequest(err, user,) {
    if(err || !user) {
      throw err || new UnauthorizedException();
    }

    return user
  }
}