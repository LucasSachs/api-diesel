import { OrdemServicoService } from '../ordem-servico/ordem-servico.service'
import { GenerateFinancialReportDto } from './dto/generate-financial-report.dto'
import { generateProdutosReportDto } from './dto/generate-produtos-report.dto'

import { Controller, Get, Query } from '@nestjs/common'
import { subDays, subMonths } from 'date-fns'
import { MoreThanOrEqual } from 'typeorm'

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

  @Get('produtos')
  async generateProdutosReport(@Query() dto: generateProdutosReportDto) {
    const nowDate = new Date()
    const from = subDays(nowDate, dto.days)

    const ordensServico = await this.ordemServicoService.find({
      where: { created_at: MoreThanOrEqual(from) },
      relations: [
        'ordem_servico_produtos',
        'ordem_servico_produtos.produto',
      ],
    })

    const mappedProdutos = ordensServico.reduce((acc, os) => {
      for (const item of os.ordem_servico_produtos ?? []) {
        const nome = item.produto.nome
        const quantidade = item.quantidade
        const total = item.valor * quantidade

        if (!acc[nome]) {
          acc[nome] = {
            nome,
            quantidade: 0,
            total: 0,
            min: 0,
            sumWeighted: 0,
          }
        }

        acc[nome].quantidade += quantidade
        acc[nome].total += total
        acc[nome].min = Math.min(acc[nome].min, item.valor)
        acc[nome].sumWeighted += item.valor * quantidade
      }
      return acc
    }, {} as Record<string, { nome: string, quantidade: number, total: number, min: number, sumWeighted: number }>)

    const result = Object.values(mappedProdutos).map(produto => ({
      nome: produto.nome,
      quantidade: produto.quantidade,
      total: produto.total,
      minimo: produto.min,
      medio: produto.sumWeighted / produto.quantidade,
    }))

    return result
  }
}
