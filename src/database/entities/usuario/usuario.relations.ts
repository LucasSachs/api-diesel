import { OneToMany } from 'typeorm'
import { Nota } from '../nota/nota.entity'

export class UsuarioRelations {
  @OneToMany(() => Nota, nota => nota.usuario)
  notas: Nota[]
}
