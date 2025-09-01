import { JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { Cliente } from '../cliente/cliente.entity'
import { Endereco } from '../endereco/endereco.entity'

export class PropriedadeRelations {
  @ManyToOne(() => Cliente, cliente => cliente.propriedades)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente

  @OneToOne(() => Endereco, endereco => endereco.propriedade, { cascade: true })
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco
}
