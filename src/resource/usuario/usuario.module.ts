import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Usuario } from 'src/database/entities/usuario/usuario.entity'
import { UsuarioController } from './usuario.controller'
import { UsuarioService } from './usuario.service'

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
  imports: [TypeOrmModule.forFeature([Usuario])],
})
export class UsuarioModule {}
