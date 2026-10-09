import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly _usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.assertEmailAvailable(createUserDto.email);

    const user = this._usersRepository.create(createUserDto);

    return this._usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this._usersRepository.find({ order: { createdAt: "ASC" } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this._usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    return this._usersRepository.findOneBy({
      email: email.trim().toLowerCase(),
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      await this.assertEmailAvailable(updateUserDto.email);
      user.emailVerifiedAt = null;
    }

    this._usersRepository.merge(user, updateUserDto);

    return this._usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    await this._usersRepository.softRemove(user);
  }

  async markEmailVerified(id: string): Promise<User> {
    const user = await this.findOne(id);

    user.emailVerifiedAt = new Date();

    return this._usersRepository.save(user);
  }

  private async assertEmailAvailable(email: string): Promise<void> {
    const exists = await this._usersRepository.exists({
      where: { email },
      withDeleted: true,
    });

    if (exists) {
      throw new ConflictException(`Email ${email} is already in use`);
    }
  }
}
