import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly userRepository: UserRepository;

  constructor(private connection: Connection) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneOrFail(id);
  }
}
