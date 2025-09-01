import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ClienteRelations } from './cliente.relations'

@Entity()
export class Cliente extends ClienteRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({
    type: 'varchar',
    length: 14,
  })
  cpf_cnpj: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  nome: string

  @CreateDateColumn()
  created_at: Date
}
