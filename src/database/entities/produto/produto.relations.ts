import { OneToMany } from 'typeorm'
import { OrdemServicoProduto } from '../ordem-servico-produto/ordem-servico-produto.entity'

export class ProdutoRelations {
  @OneToMany(() => OrdemServicoProduto, ordem_servico_produto => ordem_servico_produto.produto)
  ordem_servico_produto: OrdemServicoProduto[]
}
