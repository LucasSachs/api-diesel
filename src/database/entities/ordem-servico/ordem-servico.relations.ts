import { OneToMany } from 'typeorm'
import { Nota } from '../nota/nota.entity'
import { OrdemServicoProduto } from '../ordem-servico-produto/ordem-servico-produto.entity'

export class OrdemServicoRelations {
  @OneToMany(() => Nota, nota => nota.ordem_servico)
  notas: Nota[]

  @OneToMany(() => OrdemServicoProduto, ordem_servico_produto => ordem_servico_produto.ordem_servico)
  ordem_servico_produtos: OrdemServicoProduto[]
}
