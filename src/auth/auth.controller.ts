import { Body, Controller, Get, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import { omit } from 'lodash'
import type { Usuario } from 'src/database/entities/usuario/usuario.entity'
import { TokenService } from 'src/lib/token/token.service'
import { UsuarioService } from 'src/resource/usuario/usuario.service'
import { Public } from './decorators/metadata/public.decorator'
import { SessionUser } from './decorators/user.decorator'
import { LoginDto } from './dtos/login.dto'
import type { UserAccessToken } from './utils/auth.types'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async getLoggedUser(
    @SessionUser() sessionUser: Usuario,
  ) {
    const sessionUserWithoutPassword = omit(sessionUser, ['senha'])
    return sessionUserWithoutPassword
  }

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async loginWithCredentials(
    @Body() body: LoginDto,
  ) {
    // Get the user that is trying to login
    const user = await this.usuarioService.findOne({ where: { email: body.email } })
    if (!user) throw new UnauthorizedException()

    if (user.senha) {
      // Verify if the password from body coincides with the password stored in the database
      const allow = await verify(user.senha, body.password)
      if (!allow) throw new UnauthorizedException()
    }
    else {
      // If user does not have a password, check if body password is equal to the default password
      const allow = body.password === this.configService.get('USER_DEFAULT_PASSWORD') as string
      if (!allow) throw new UnauthorizedException()
    }

    const payload: Omit<UserAccessToken, 'iat' | 'exp'> = {
      user_id: user.id,
      name: user.nome,
      email: user.email,
      role: user.cargo,
    }

    const access_token = await this.tokenService.generateSessionToken(payload)
    return { access_token }
  }
}
