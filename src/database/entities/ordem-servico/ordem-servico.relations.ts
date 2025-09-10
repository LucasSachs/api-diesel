import { JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm'
import { Nota } from '../nota/nota.entity'
import { OrdemServicoProduto } from '../ordem-servico-produto/ordem-servico-produto.entity'
import { Propriedade } from '../propriedade/propriedade.entity'
import { Servico } from '../servico/servico.entity'

export class OrdemServicoRelations {
  @OneToMany(() => Nota, nota => nota.ordem_servico, { onDelete: 'CASCADE' })
  notas: Nota[]

  @OneToMany(() => OrdemServicoProduto, ordem_servico_produto => ordem_servico_produto.ordem_servico, { onDelete: 'CASCADE' })
  ordem_servico_produtos: OrdemServicoProduto[]

  @ManyToMany(() => Servico, servico => servico.ordens_servico, { onDelete: 'CASCADE' })
  servicos: Servico[]

  @ManyToOne(() => Propriedade, propriedade => propriedade.ordens_servico)
  @JoinColumn({ name: 'propriedade_id' })
  propriedade: Propriedade
}
