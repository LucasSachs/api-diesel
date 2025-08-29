import { Controller } from '@nestjs/common'
import { SessionUser } from 'src/auth/decorators/user.decorator'
import type { Usuario } from 'src/database/entities/usuario/usuario.entity'
import { UsuarioService } from './usuario.service'

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
  ) {}

  async getUserSession(
    @SessionUser() sessionUser: Usuario,
  ) {
    console.log(sessionUser)
  }
}
