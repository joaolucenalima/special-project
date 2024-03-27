import { UserRepository } from "@/repositories/user-repository"
import { UserServices } from "../user.service"

export function makeUserService() {
  const userRepository = new UserRepository()

  return new UserServices(userRepository)
}