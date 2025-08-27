import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { NotaRelations } from './nota.relations'

@Entity()
export class Nota extends NotaRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ unsigned: true })
  ordem_servico_id: number

  @Column({ unsigned: true })
  usuario_id: number

  @CreateDateColumn()
  created_at: Date

  @Column({ type: 'text' })
  descricao: string
}
