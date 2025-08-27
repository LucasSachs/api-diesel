import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CidadeRelations } from './cidade.relations'

@Entity()
export class Cidade extends CidadeRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  descricao: string
}
