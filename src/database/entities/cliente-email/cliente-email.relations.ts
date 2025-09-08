import { JoinColumn, ManyToOne } from 'typeorm'
import { Cliente } from '../cliente/cliente.entity'

export class ClienteEmailRelations {
  @ManyToOne(() => Cliente, cliente => cliente.emails, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente
}
