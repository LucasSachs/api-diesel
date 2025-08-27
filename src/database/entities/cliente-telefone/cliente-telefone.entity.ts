import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ClienteTelefoneRelations } from './cliente-telefone.relations'

@Entity()
export class ClienteTelefone extends ClienteTelefoneRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ unsigned: true })
  cliente_id: number

  @Column({
    type: 'varchar',
    length: 11,
  })
  descricao: string
}
