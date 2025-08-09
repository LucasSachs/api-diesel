import { OneToMany } from 'typeorm'
import { Endereco } from '../endereco/endereco.entity'

export class UfRelations {
  @OneToMany(() => Endereco, endereco => endereco.uf)
  enderecos: Endereco[]
}
