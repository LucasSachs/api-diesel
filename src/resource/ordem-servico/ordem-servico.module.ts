import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrdemServico } from 'src/database/entities/ordem-servico/ordem-servico.entity'
import { OrdemServicoController } from './ordem-servico.controller'
import { OrdemServicoService } from './ordem-servico.service'

@Module({
  imports: [TypeOrmModule.forFeature([OrdemServico])],
  controllers: [OrdemServicoController],
  providers: [OrdemServicoService],
})
export class OrdemServicoModule {}
