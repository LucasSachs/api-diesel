import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import ServicoRelations from './servico.relations.entity'

@Entity()
export class Servico extends ServicoRelations {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  nome: string

  @Column({
    type: 'text',
    nullable: true,
  })
  descricao: string
}
