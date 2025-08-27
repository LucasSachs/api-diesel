import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { OrdemServicoRelations } from './ordem-servico.relations'

enum MetodoPagamento {
  AVISTA = 'avista',
}

enum PrazoPagamento {
  '10d' = '10 dias',
}

enum Status {
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

  @Column({ type: 'text' })
  descricao: string

  @Column({
    type: 'enum',
    enum: MetodoPagamento,
  })
  metodo_pagamento: MetodoPagamento

  @Column({
    type: 'enum',
    enum: PrazoPagamento,
  })
  prazo_pagamento: PrazoPagamento

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status

  @Column({ unsigned: true })
  valor_deslocamento: number

  @Column({ unsigned: true })
  valor_mo: number

  @Column({ unsigned: true })
  valor_produtos: number
}
