import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common'
import { verify } from 'argon2'
import { TokenService } from 'src/lib/token/token.service'
import { UsuarioService } from 'src/resource/usuario/usuario.service'
import { Public } from './decorators/metadata/public.decorator'
import { LoginDto } from './dtos/login.dto'
import type { UserAccessToken } from './utils/auth.types'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async loginWithCredentials(@Body() body: LoginDto) {
    // Get the user that is trying to login
    const user = await this.usuarioService.findOne({ where: { email: body.email } })
    if (!user) throw new UnauthorizedException()

    // Verify if the password from body coincides with the password stored in the database
    const allow = await verify(user.senha, body.password)
    if (!allow) throw new UnauthorizedException()

    const payload: Omit<UserAccessToken, 'iat' | 'exp'> = {
      user_id: user.id,
    }

    const access_token = await this.tokenService.generateSessionToken(payload)
    return { access_token }
  }
}
