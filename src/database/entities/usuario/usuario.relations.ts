import { ManyToMany, OneToMany } from 'typeorm'
import { Nota } from '../nota/nota.entity'
import { OrdemServico } from '../ordem-servico/ordem-servico.entity'

export class UsuarioRelations {
  @OneToMany(() => Nota, nota => nota.usuario)
  notas: Nota[]

  @ManyToMany(() => OrdemServico, ordemServico => ordemServico.usuarios)
  ordens_servico: OrdemServico[]
}
