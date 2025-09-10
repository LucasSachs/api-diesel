import { JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Cliente } from '../cliente/cliente.entity'
import { Endereco } from '../endereco/endereco.entity'
import { OrdemServico } from '../ordem-servico/ordem-servico.entity'

export class PropriedadeRelations {
  @ManyToOne(() => Cliente, cliente => cliente.propriedades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente

  @OneToOne(() => Endereco, endereco => endereco.propriedade, { cascade: true })
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco

  @OneToMany(() => OrdemServico, ordemServico => ordemServico.propriedade)
  ordens_servico: OrdemServico[]
}
