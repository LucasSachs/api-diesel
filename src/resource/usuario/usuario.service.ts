import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Usuario } from 'src/database/entities/usuario/usuario.entity'
import type { FindOneOptions, Repository } from 'typeorm'

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findOne(filter: FindOneOptions<Usuario>) {
    const usuario = await this.usuarioRepository.findOne(filter)
    return usuario
  }
}
