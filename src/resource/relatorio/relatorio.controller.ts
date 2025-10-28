import { Controller, Get, Query } from '@nestjs/common'
import { subMonths } from 'date-fns'
import { MoreThanOrEqual } from 'typeorm'
import { OrdemServicoService } from '../ordem-servico/ordem-servico.service'
import { GenerateFinancialReportDto } from './dto/generate-financial-report.dto'

@Controller('relatorio')
export class RelatorioController {
  constructor(private readonly ordemServicoService: OrdemServicoService) {}

  @Get('financeiro')
  async generateFinancialReport(@Query() dto: GenerateFinancialReportDto) {
    const nowDate = new Date()
    const from = subMonths(nowDate, dto.months)

    const data = await this.ordemServicoService.find({
      where: { created_at: MoreThanOrEqual(from) },
      relations: ['ordem_servico_produtos'],
    })

    const reducedData = data.reduce((acc, ordemServico) => {
      const totalProducts = ordemServico.ordem_servico_produtos.reduce((accProduct, product) => accProduct + Number(product.quantidade) * Number(product.valor), 0)

      return {
        total: acc.total + Number(ordemServico.valor_mo) + Number(ordemServico.valor_deslocamento) + totalProducts,
        totalMo: acc.totalMo + Number(ordemServico.valor_mo),
        totalDeslocamento: acc.totalDeslocamento + Number(ordemServico.valor_deslocamento),
        totalProdutos: acc.totalProdutos + totalProducts,
      }
    }, {
      total: 0,
      totalMo: 0,
      totalDeslocamento: 0,
      totalProdutos: 0,
    })

    return {
      from,
      to: nowDate,
      ...reducedData,
    }
  }
}
