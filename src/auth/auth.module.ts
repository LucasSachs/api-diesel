import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { SessionModule } from 'src/app/session/session.module'
import { UserModule } from 'src/app/user/user.module'
import { TokenService } from 'src/lib/token/token.service'
import { AuthController } from './auth.controller'
import { AuthGuard } from './guards/auth.guard'

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    SessionModule,
  ],
  providers: [
    JwtService,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
