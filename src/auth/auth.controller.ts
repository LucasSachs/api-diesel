import { Body, Controller, Get, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { hash, verify } from 'argon2'
import { User } from 'entities/user-scope/user/user.entity'
import { randomUUID } from 'node:crypto'
import { SessionService } from 'src/app/session/session.service'
import { UserService } from 'src/app/user/user.service'
import { TokenService } from 'src/lib/token/token.service'
import { NoPermissionContext } from './decorators/metadata/no-permission-context.decorator'
import { Public } from './decorators/metadata/public.decorator'
import { SessionUser } from './decorators/user.decorator'
import { LoginDto, LoginResponse } from './dtos/login.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: 'Invalid credentials or user does not exists' })
  @ApiOkResponse({
    description: 'Successfully made the login.',
    type: LoginResponse,
  })
  @ApiOperation({
    summary: 'Login with credentials',
    description: 'Makes the login using email and password.',
  })
  async loginWithCredentials(@Body() body: LoginDto): Promise<LoginResponse> {
    // Get the user that is trying to login
    const user = await this.userService.findOne({
      where: { email_login: body.email },
      relations: ['session'],
    })
    if (!user) throw new UnauthorizedException()

    // If password is null in database, then get the default password from environment variables
    if (!user.password) {
      user.password = await hash(this.configService.get('DEFAULT_PASSWORD') as string)
    }

    // Verify if the password from body coincides with the password stored in the database
    const allow = await verify(user.password, body.password)
    if (!allow) throw new UnauthorizedException()

    // If find a existing session, refresh it changing the ID
    const new_session_id = randomUUID()
    const access_token = await this.tokenService.generateSessionToken({
      id: new_session_id,
      remember: body.remember,
    })

    // Saves or update the session
    const token_payload = this.tokenService.decodeToken(access_token)
    await this.sessionService.save({
      id_user: user.id,
      id_session: new_session_id,
      expires_at: new Date(token_payload.exp * 1000),
    })

    return { access_token }
  }

  @Get('/session')
  @NoPermissionContext()
  async getUserFromSession(@SessionUser() user: User) {
    return {
      ...user,
      password: undefined,
    }
  }
}
