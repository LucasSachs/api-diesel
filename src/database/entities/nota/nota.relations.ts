import { JoinColumn, ManyToOne } from 'typeorm'
import { OrdemServico } from '../ordem-servico/ordem-servico.entity'
import { Usuario } from '../usuario/usuario.entity'

export class NotaRelations {
  @ManyToOne(() => OrdemServico, ordem_servico => ordem_servico.notas)
  @JoinColumn({ name: 'ordem_servico_id' })
  ordem_servico: OrdemServico

  @ManyToOne(() => Usuario, usuario => usuario.notas)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario
}
