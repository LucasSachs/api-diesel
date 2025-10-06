import { faker } from '@faker-js/faker/locale/pt_BR'
import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import type { ClienteEmail } from 'src/database/entities/cliente-email/cliente-email.entity'
import type { ClienteTelefone } from 'src/database/entities/cliente-telefone/cliente-telefone.entity'
import type { Cliente } from 'src/database/entities/cliente/cliente.entity'
import type { Propriedade } from 'src/database/entities/propriedade/propriedade.entity'
import { Cargo, Status, type Usuario } from 'src/database/entities/usuario/usuario.entity'
import { ClienteService } from 'src/resource/cliente/cliente.service'
import { ProdutoService } from 'src/resource/produto/produto.service'
import { ServicoService } from 'src/resource/servico/servico.service'
import { UsuarioService } from 'src/resource/usuario/usuario.service'
import type { DeepPartial } from 'typeorm'

@Injectable()
export class DatabaseSeederService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly produtoService: ProdutoService,
    private readonly servicoService: ServicoService,
    private readonly clienteService: ClienteService,
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
          rg: String(faker.number.int({ min: 100000000, max: 999999999 })),
          senha: await hash('senha123'),
          status: index > 2 ? Status.INATIVO : Status.ATIVO,
          cpf: String(faker.number.int({ min: 10000000000, max: 99999999999 })),
          data_nascimento: faker.date.birthdate(),
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
        rg: String(faker.number.int({ min: 100000000, max: 999999999 })),
        senha: await hash('senha123'),
        status: Status.ATIVO,
        cpf: String(faker.number.int({ min: 10000000000, max: 99999999999 })),
        data_nascimento: faker.date.birthdate(),
      }

      return funcionario
    })()

    await this.usuarioService.insert(funcionarios.concat(administrador))

    // * Adiciona 5 tipos de serviços
    const servicosId = await this.servicoService.insert([{
      nome: 'Limpeza de Tanque de Combustível',
      descricao: 'Realizar limpeza completa do tanque de combustível',
    }, {
      nome: 'Reparo de Tanque de Combustível',
      descricao: 'Executar reparos em tanques danificados ou com pequenas avarias',
    }, {
      nome: 'Inspeção de Vazamentos no Tanque de Combustível',
      descricao: 'Verificar possíveis vazamentos e falhas de vedação no tanque de combustível',
    }, {
      nome: 'Drenagem de Combustível Contaminado',
      descricao: 'Esvaziar o tanque em caso de abastecimento com combustível adulterado ou errado',
    }, {
      nome: 'Revisão Completa do Sistema de Combustível',
      descricao: 'Avaliação geral de bomba, filtros, linhas, tanque e injetores do sistema de combustível',
    }])

    // * Adiciona 10 tipos de produtos
    const produtosId = await this.produtoService.insert([{
      nome: 'Tampa de Inspeção para Tanque de Combustível',
      descricao: 'Tampa de acesso utilizada para inspeção e manutenção interna do tanque de combustível',
      valor: 100,
    }, {
      nome: 'Válvula de Respiro',
      descricao: 'Dispositivo que permite a troca de ar no tanque, evitando pressão excessiva ou vácuo',
      valor: 150,
    }, {
      nome: 'Bocal de Abastecimento com Tampa',
      descricao: 'Componente por onde é feito o abastecimento do tanque, com tampa rosqueada ou articulada',
      valor: 75,
    }, {
      nome: 'Flange de Saída para Tanque de Diesel',
      descricao: 'Conexão utilizada para acoplar mangueiras ou tubos à saída do tanque',
      valor: 450,
    }, {
      nome: 'Sensor de Nível de Combustível',
      descricao: 'Peça eletrônica ou mecânica que monitora o nível de combustível dentro do tanque',
      valor: 250,
    }, {
      nome: 'Junta de Vedação para Tampa de Inspeção',
      descricao: 'Elemento de vedação para evitar vazamentos em tampas e flanges do tanque',
      valor: 650,
    }, {
      nome: 'Filtro de Sucção Interno para Tanque',
      descricao: 'Filtro instalado na linha de saída para reter impurezas antes da bomba de transferência',
      valor: 25,
    }, {
      nome: 'Kit de Parafusos e Abraçadeiras para Tanque',
      descricao: 'Conjunto de fixadores utilizados na montagem e vedação de componentes do tanque',
      valor: 100,
    }, {
      nome: 'Válvula de Retenção para Linha de Saída',
      descricao: 'Peça que impede o retorno do combustível para o tanque após bombeamento',
      valor: 450,
    }, {
      nome: 'Indicador Visual de Nível de Combustível',
      descricao: 'Dispositivo externo que mostra o nível aproximado de diesel no tanque',
      valor: 800,
    }])

    // * Gera 50 clientes
    const clientes = await Promise.all(Array.from({ length: 50 }).map(async () => {
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()

      const amountEmails = faker.number.int({ min: 1, max: 3 })
      const emails: Partial<ClienteEmail>[] = Array.from({ length: amountEmails }).map(() => {
        return { descricao: faker.internet.email({ firstName, lastName }) }
      })

      const amountTelefones = faker.number.int({ min: 1, max: 3 })
      const telefones: Partial<ClienteTelefone>[] = Array.from({ length: amountTelefones }).map(() => {
        return {
          descricao: '429'.concat(faker.phone.number({ style: 'international' }).slice(-8)),
        }
      })

      const amountPropriedades = faker.number.int({ min: 1, max: 3 })
      const propriedades: DeepPartial<Propriedade>[] = Array.from({ length: amountPropriedades }).map(() => {
        return {
          cadpro: String(faker.number.int({ min: 1000000000, max: 9999999999 })),
          endereco: {
            lat: faker.location.latitude({ precision: 6 }),
            long: faker.location.longitude({ precision: 6 }),
          },
        }
      })

      const cliente: DeepPartial<Cliente> = {
        nome: faker.person.fullName({ firstName, lastName }),
        cpf_cnpj: String(faker.number.int({ min: 10000000000, max: 99999999999 })),
        emails,
        telefones,
        propriedades,
      }

      const savedCliente = await this.clienteService.save(cliente)

      return savedCliente
    }))
  }
}
