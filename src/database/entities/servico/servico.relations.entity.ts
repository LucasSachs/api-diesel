import { JoinTable, ManyToMany } from 'typeorm'
import { OrdemServico } from '../ordem-servico/ordem-servico.entity'

export default class ServicoRelations {
  @ManyToMany(() => OrdemServico, ordem_servico => ordem_servico.servicos)
  @JoinTable({
    name: 'ordem_servico_servico',
    joinColumn: { name: 'servico_id' },
    inverseJoinColumn: { name: 'ordem_servico_id' },
  })
  ordens_servico: OrdemServico[]
}
