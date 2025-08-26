import { JoinColumn, ManyToOne } from 'typeorm'
import { OrdemServico } from '../ordem-servico/ordem-servico.entity'
import { Produto } from '../produto/produto.entity'

export class OrdemServicoProdutoRelations {
  @ManyToOne(() => OrdemServico, ordem_servico => ordem_servico.ordem_servico_produtos)
  @JoinColumn({ name: 'ordem_servico_id' })
  ordem_servico: OrdemServico

  @ManyToOne(() => Produto, produto => produto.ordem_servico_produto)
  @JoinColumn({ name: 'produto_id' })
  produto: Produto
}
