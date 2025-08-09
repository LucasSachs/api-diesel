import { JoinColumn, ManyToOne } from 'typeorm'
import { Cidade } from '../cidade/cidade.entity'
import { Uf } from '../uf/uf.entity'

export class EnderecoRelations {
  @ManyToOne(() => Cidade, cidade => cidade.enderecos)
  @JoinColumn({ name: 'cidade_id' })
  cidade: Cidade

  @ManyToOne(() => Uf, uf => uf.enderecos)
  @JoinColumn({ name: 'uf_id' })
  uf: Uf
}
