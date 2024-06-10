import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { Jwtpayload } from "./jwt-payload.interface"
import { UsersService } from "src/users/users.service"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { User } from "src/users/user.entity"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      secretOrKey: configService.getOrThrow("JWT_SECRET"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: Jwtpayload): Promise<User> {
    const { sub, username } = payload
    const user = await this.usersService.findOne(username)
    if (!user) throw new UnauthorizedException()
    return user
  }
}
