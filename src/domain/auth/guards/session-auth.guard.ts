import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../entities/session.entity';

@Injectable()
export class SessionAuthGuard extends AuthGuard('jwt') {
  constructor(
    @InjectRepository(Session)
    private sessionRepo: Repository<Session>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isValid = await super.canActivate(context);

    if (!isValid) return false;

    const token = request.headers.authorization?.split(' ')[1];
    console.log('Token value ', token);
    const session = await this.sessionRepo.findOne({ where: { token, revoked: false } });

    console.log('session value ', session)

    return !!session;
  }
}
