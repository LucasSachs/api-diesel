import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ClienteEmailRelations } from './cliente-email.relations'

@Entity()
export class ClienteEmail extends ClienteEmailRelations {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unsigned: true })
  cliente_id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  descricao: string
}
