import { UserData } from "@/repositories/interfaces/user";
import { UserRepository } from "@/repositories/user";

export class UserServices {
  constructor(private userRepository: UserRepository) { }

  async login(userData: UserData) {
    const user = await this.userRepository.findByEmail(userData.email);

    if (user.rows.length === 0) {
      await this.userRepository.create(userData);
    }
  }
}