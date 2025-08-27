import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { UfRelations } from './uf.relations'

@Entity()
export class Uf extends UfRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  descricao: string
}
