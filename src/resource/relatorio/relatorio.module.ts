import { Module } from '@nestjs/common'
import { OrdemServicoModule } from '../ordem-servico/ordem-servico.module'
import { RelatorioController } from './relatorio.controller'

@Module({
  controllers: [RelatorioController],
  imports: [OrdemServicoModule],
})
export class RelatorioModule {}
