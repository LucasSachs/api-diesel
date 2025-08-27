import { faker } from '@faker-js/faker/locale/pt_BR'
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
    // * Gera 5 funcionários, 3 ativos e 2 inativos
    const funcionarios = await Promise.all(
      Array.from({ length: 5 }).map(async (_, index) => {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        const funcionario: Partial<Usuario> = {
          cargo: Cargo.COLABORADOR,
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          nome: faker.person.fullName({ firstName, lastName }),
          rg: '',
          senha: await hash('senha123'),
          status: index > 2 ? Status.INATIVO : Status.ATIVO,
        }

        return funcionario
      }),
    )

    // * Gera 1 administrador ativo
    const administrador = await (async () => {
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()

      const funcionario: Partial<Usuario> = {
        cargo: Cargo.ADMINISTRADOR,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        nome: faker.person.fullName({ firstName, lastName }),
        rg: '',
        senha: await hash('senha123'),
        status: Status.ATIVO,
      }

      return funcionario
    })()

    console.log(funcionarios, administrador)

    // await this.usuarioService.save(user)
  }
}
