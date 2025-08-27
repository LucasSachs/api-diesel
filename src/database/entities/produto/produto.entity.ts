import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ProdutoRelations } from './produto.relations'

@Entity()
export class Produto extends ProdutoRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @CreateDateColumn()
  created_at: Date

  @Column({ type: 'text' })
  descricao: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  nome: string

  @Column({ unsigned: true })
  tamanho_tanque: number
}
