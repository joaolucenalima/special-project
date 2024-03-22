import { UserData } from "@/repositories/interfaces/user";
import { UserRepository } from "@/repositories/user-repository";

export class UserServices {
  constructor(private userRepository: UserRepository) { }

  async login(userData: UserData) {
    let user = await this.userRepository.findByEmail(userData.email);

    if (user.rows.length === 0) {
      user = await this.userRepository.create(userData);
    }

    return user.rows[0].id;
  }
}