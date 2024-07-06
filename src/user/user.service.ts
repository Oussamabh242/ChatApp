import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.update(id, updateUserDto);
      return 'user name changed to ' + user.fullName;
    } catch (err) {
      console.log(err);
      return 'error occured when updateing user';
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
