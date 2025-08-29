import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Usuario } from 'src/database/entities/usuario/usuario.entity'
import type { DeepPartial, FindOneOptions, Repository } from 'typeorm'

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
  ) {}

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
