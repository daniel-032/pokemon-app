import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<(User & { access_token: string }) | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return null;
    const payload = { sub: user.userId };
    const token = this.jwtService.sign(payload, { expiresIn: '7d' });
    return isMatch ? { ...user, access_token: token } : null;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { userId: id } });
  }
}
