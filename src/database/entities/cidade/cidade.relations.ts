import { OneToMany } from 'typeorm'
import { Endereco } from '../endereco/endereco.entity'

export class CidadeRelations {
  @OneToMany(() => Endereco, endereco => endereco.cidade)
  enderecos: Endereco[]
}
