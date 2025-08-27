import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { TokenService } from 'src/lib/token/token.service'
import { UsuarioModule } from 'src/resource/usuario/usuario.module'
import { AuthController } from './auth.controller'
import { AuthGuard } from './guards/auth.guard'

@Module({
  controllers: [AuthController],
  imports: [UsuarioModule],
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
