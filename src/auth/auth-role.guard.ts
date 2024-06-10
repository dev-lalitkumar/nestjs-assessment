import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common"
import { UserRoleEnum } from "src/users/enums/user-role.enum"

export const AuthRoleGuard = (role: UserRoleEnum): Type<CanActivate> => {
  class AuthRoleGuardMixin implements CanActivate {
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest()
      const user = request.user
      return user.role === role
    }
  }
  const guard = mixin(AuthRoleGuardMixin)
  return guard
}
