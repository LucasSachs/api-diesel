import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { OrdemServicoProdutoRelations } from './ordem-servico-produto.relations'

@Entity()
export class OrdemServicoProduto extends OrdemServicoProdutoRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ unsigned: true })
  ordem_servico_id: number

  @Column({ unsigned: true })
  produto_id: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    unsigned: true,
  })
  quantidade: number

  @Column({ unsigned: true })
  valor: number
}
