import { JoinColumn, ManyToOne } from 'typeorm'
import { Cliente } from '../cliente/cliente.entity'

export class ClienteTelefoneRelations {
  @ManyToOne(() => Cliente, cliente => cliente.telefones, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente
}
