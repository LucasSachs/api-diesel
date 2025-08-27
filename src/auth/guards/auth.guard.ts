import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { InvalidTokenException } from 'src/lib/token/errors/token.exception.invalid'
import { TokenService } from 'src/lib/token/token.service'
import { UsuarioService } from 'src/resource/usuario/usuario.service'
import { IS_PUBLIC_KEY } from '../decorators/metadata/public.decorator'
import { UserAccessToken } from '../utils/auth.types'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly usuarioService: UsuarioService,
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

    // Get access_token from the authorization header
    const token = request.headers.authorization?.replace('Bearer ', '')
    if (!token) throw new UnauthorizedException()

    try {
      // Verify if the token is valid, otherwise the request is not authorized
      const payload: UserAccessToken = await this.tokenService.verifyToken(token)

      // Get user session from the database
      const user = await this.usuarioService.findOne({
        where: { id: payload.user_id },
      })
      if (!user) throw new UnauthorizedException('Usuario nao encontrado')

      request.user = user
    }
    catch {
      throw new InvalidTokenException()
    }

    return true
  }
}
