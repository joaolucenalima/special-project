import { UserData } from "../repositories/interfaces/user";
import { UserRepository } from "../repositories/user";

export class UserServices {
  constructor(private userRepository: UserRepository) { }

  async login(userData: UserData) {
    await this.userRepository.create(userData);
  }
}