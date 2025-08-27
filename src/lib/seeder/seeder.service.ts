import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { Cargo, Status, type Usuario } from 'src/database/entities/usuario/usuario.entity'
import { UsuarioService } from 'src/resource/usuario/usuario.service'

@Injectable()
export class DatabaseSeederService {
  constructor(
    private readonly usuarioService: UsuarioService,
  ) {}

  async seed() {
    const user: Partial<Usuario> = {
      cargo: Cargo.ADMINISTRADOR,
      email: 'lucas@email.com',
      nome: 'Lucas Sachs',
      rg: '149906959',
      senha: await hash('senha123'),
      status: Status.ATIVO,
    }

    await this.usuarioService.save(user)
  }
}
