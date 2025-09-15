import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EnderecoRelations } from './endereco.relations'

@Entity()
export class Endereco extends EnderecoRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({
    unsigned: true,
    nullable: true,
  })
  cidade_id?: number

  @Column({
    unsigned: true,
    nullable: true,
  })
  uf_id?: number

  @Column({
    type: 'varchar',
    length: 8,
    nullable: true,
  })
  cep?: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  complemento?: string

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 6,
    nullable: true,
  })
  lat?: number

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 6,
    nullable: true,
  })
  long?: number

  @Column({ nullable: true })
  numero?: number
}
