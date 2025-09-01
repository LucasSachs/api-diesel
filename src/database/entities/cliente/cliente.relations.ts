import { OneToMany } from 'typeorm'
import { ClienteEmail } from '../cliente-email/cliente-email.entity'
import { ClienteTelefone } from '../cliente-telefone/cliente-telefone.entity'
import { Propriedade } from '../propriedade/propriedade.entity'

export class ClienteRelations {
  @OneToMany(() => ClienteTelefone, cliente_telefone => cliente_telefone.cliente, { cascade: true })
  telefones: ClienteTelefone[]

  @OneToMany(() => ClienteEmail, cliente_email => cliente_email.cliente, { cascade: true })
  emails: ClienteEmail[]

  @OneToMany(() => Propriedade, propriedade => propriedade.cliente, { cascade: true })
  propriedades: Propriedade[]
}
