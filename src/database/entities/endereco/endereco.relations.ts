import { JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { Cidade } from '../cidade/cidade.entity'
import { Propriedade } from '../propriedade/propriedade.entity'
import { Uf } from '../uf/uf.entity'

export class EnderecoRelations {
  @ManyToOne(() => Cidade, cidade => cidade.enderecos)
  @JoinColumn({ name: 'cidade_id' })
  cidade: Cidade

  @ManyToOne(() => Uf, uf => uf.enderecos)
  @JoinColumn({ name: 'uf_id' })
  uf: Uf

  @OneToOne(() => Propriedade, propriedade => propriedade.endereco)
  propriedade: Propriedade
}
