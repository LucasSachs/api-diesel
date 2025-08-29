import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Cargo } from 'src/database/entities/usuario/usuario.entity'
import { Roles } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Get parameters from the decorator, example: @Roles([UserRoleEnum.ADMIN])
    const allowed_roles = this.reflector.get(Roles, context.getHandler())
    if (!allowed_roles) return true

    // Get the user request
    const request = context.switchToHttp().getRequest()
    const user_role = request.user.role

    // If user is admin, grant access to all endpoints
    if (user_role === Cargo.ADMINISTRADOR) return true

    // Check if the user is allowed to take the action
    const allow = this.validateRoles(allowed_roles, user_role)
    if (!allow) throw new UnauthorizedException('The access to this endpoint is restricted')

    return true
  }

  validateRoles(allowed_roles: Cargo[], user_role: Cargo) {
    return allowed_roles.includes(user_role)
  }
}
