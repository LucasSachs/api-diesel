import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { PropriedadeRelations } from './propriedade.relations'

@Entity()
export class Propriedade extends PropriedadeRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ unsigned: true })
  cliente_id: number

  @Column({ unsigned: true })
  endereco_id: number

  @Column({
    type: 'varchar',
    length: 11,
  })
  cadpro: string

  @CreateDateColumn()
  created_at: Date
}
