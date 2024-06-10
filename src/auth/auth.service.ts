import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UsersService } from "src/users/users.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { LoginDto } from "./dto/login.dto"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username)
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...rest } = user
      return rest
    }
    return null
  }

  async login(loginDto: LoginDto) {
    const { password, username } = loginDto
    try {
      const user = await this.validateUser(username, password)
      if (!user) throw new UnauthorizedException(`Invalid username or password`)
      const payload = { username: user.email, sub: user.id }
      return {
        access_token: this.jwtService.sign(payload)
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
