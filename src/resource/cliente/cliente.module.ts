import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cliente } from 'src/database/entities/cliente/cliente.entity'
import { CidadeModule } from '../cidade/cidade.module'
import { UfModule } from '../uf/uf.module'
import { ClienteController } from './cliente.controller'
import { ClienteService } from './cliente.service'

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    CidadeModule,
    UfModule,
  ],
})
export class ClienteModule {}
