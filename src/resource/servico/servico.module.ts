import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Servico } from 'src/database/entities/servico/servico.entity'
import { ServicoController } from './servico.controller'
import { ServicoService } from './servico.service'

@Module({
  imports: [TypeOrmModule.forFeature([Servico])],
  controllers: [ServicoController],
  providers: [ServicoService],
})
export class ServicoModule {}
