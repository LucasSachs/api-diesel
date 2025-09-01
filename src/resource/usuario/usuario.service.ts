import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Usuario } from 'src/database/entities/usuario/usuario.entity'
import { ILike, Like, type DeepPartial, type FindManyOptions, type FindOneOptions, type FindOptionsWhere, type Repository } from 'typeorm'

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async find(filters: FindManyOptions<Usuario>) {
    const whereOptions = filters.where as FindOptionsWhere<Usuario>

    const users = await this.usuarioRepository.find({
      ...filters,
      where: {
        ...whereOptions,
        nome: whereOptions.nome ? ILike(`%${whereOptions.nome}%`) : undefined,
        email: whereOptions.email ? ILike(`%${whereOptions.email}%`) : undefined,
        rg: whereOptions.rg ? Like(`%${whereOptions.rg}%`) : undefined,
        cpf: whereOptions.cpf ? Like(`%${whereOptions.cpf}%`) : undefined,
      },
    })

    return users
  }

  async findOne(filter: FindOneOptions<Usuario>) {
    const user = await this.usuarioRepository.findOne(filter)

    return user
  }

  async insert(users: DeepPartial<Usuario> | DeepPartial<Usuario>[]) {
    const insertedIds = await this.usuarioRepository.insert(users)

    return insertedIds
  }

  async save(user: DeepPartial<Usuario>) {
    const savedUser = await this.usuarioRepository.save(user)

    return savedUser
  }

  async delete(id: number) {
    const deletedUser = await this.usuarioRepository.delete(id)

    return deletedUser
  }
}
