import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { OrdemServicoRelations } from './ordem-servico.relations'

export enum Status {
  ANDAMENTO = 'Em andamento',
  CONCLUIDA = 'Concluida',
}

@Entity()
export class OrdemServico extends OrdemServicoRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ unsigned: true })
  propriedade_id: number

  @CreateDateColumn()
  created_at: Date

  @Column({
    type: 'text',
    nullable: true,
  })
  descricao: string | null

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status

  @Column({ unsigned: true })
  valor_deslocamento: number

  @Column({ unsigned: true })
  valor_mo: number
}
