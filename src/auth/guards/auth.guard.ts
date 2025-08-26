import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from 'entities/user-scope/user/user.entity'
import { SessionService } from 'src/app/session/session.service'
import { TokenService } from 'src/lib/token/token.service'
import { NO_PERMISSION_CONTEXT_KEY } from '../decorators/metadata/no-permission-context.decorator'
import { IS_PUBLIC_KEY } from '../decorators/metadata/public.decorator'
import { UserAccessToken } from '../utils/auth.types'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
    private sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verify if the route is marked with Public decorator
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) return true

    // Get the request data
    const request = context.switchToHttp().getRequest()

    // Get user execution context from the headers
    const permissionContext = request.headers.permission_context

    // Get access_token from the authorization header
    const token = request.headers.authorization?.replace('Bearer ', '')
    if (!token) throw new UnauthorizedException()

    try {
      // Verify if the token is valid, otherwise the request is not authorized
      const payload: UserAccessToken = await this.tokenService.verifyToken(token)

      // Get user session from the database
      const session = await this.sessionService.findOne({
        where: { id_session: payload.id },
        relations: [
          'user',
          'user.info',
          'user.permissions_child',
          'user.permissions_child.user_main',
          'user.permissions_child.department',
          'user.permissions_child.user_main.info',
        ],
      })

      // TODO > Validate session expires_at

      if (!session) throw new UnauthorizedException()
      const { permissions_child, ...user } = session.user
      request.user = user

      // Verify if the route is marked with NoPermissionContext decorator
      const noPermissionContext = this.reflector.getAllAndOverride<boolean>(NO_PERMISSION_CONTEXT_KEY, [
        context.getHandler(),
        context.getClass(),
      ])

      if (noPermissionContext || user.role === UserRole.ORGANIZATION) return true
      else {
        // Verify if the user actually has the permission
        const permission = permissions_child.find(permission => permission.id === Number(permissionContext))
        if (!permission) throw new UnauthorizedException('You have no permission to take this action')

        request.permission = permission
      }
    }
    catch (error) {
      throw error
    }

    return true
  }
}
