import { DataSource, Repository } from 'typeorm';
import { Type } from '../../pokemon/entities/type.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeRepository extends Repository<Type> {
  constructor(private dataSource: DataSource) {
    super(Type, dataSource.createEntityManager());
  }

  async findByName(name: string): Promise<Type | null> {
    return this.findOne({ where: { name } });
  }
}
