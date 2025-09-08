import { ManyToMany, OneToMany } from 'typeorm'
import { Nota } from '../nota/nota.entity'
import { OrdemServicoProduto } from '../ordem-servico-produto/ordem-servico-produto.entity'
import { Servico } from '../servico/servico.entity'

export class OrdemServicoRelations {
  @OneToMany(() => Nota, nota => nota.ordem_servico)
  notas: Nota[]

  @OneToMany(() => OrdemServicoProduto, ordem_servico_produto => ordem_servico_produto.ordem_servico)
  ordem_servico_produtos: OrdemServicoProduto[]

  @ManyToMany(() => Servico, servico => servico.ordens_servico)
  servicos: Servico[]
}
