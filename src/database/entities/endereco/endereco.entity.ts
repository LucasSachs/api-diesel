import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EnderecoRelations } from './endereco.relations'

@Entity()
export class Endereco extends EnderecoRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ unsigned: true })
  cidade_id: number

  @Column({ unsigned: true })
  uf_id: number

  @Column({
    type: 'varchar',
    length: 8,
    nullable: true,
  })
  cep: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  complemento?: string

  @Column()
  lat: number

  @Column()
  long: number

  @Column({ nullable: true })
  numero: number
}
