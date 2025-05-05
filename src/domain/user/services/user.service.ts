import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../entities/user.entity';
import { CreateUserDto } from './../dtos/create-user.dto';
import { UpdateUserDto } from './../dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const verifyUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (verifyUser) throw new BadRequestException('Email must be unique, user email was created before');
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(userId);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(userId: string): Promise<void> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) throw new NotFoundException('User not found');
  }
}
