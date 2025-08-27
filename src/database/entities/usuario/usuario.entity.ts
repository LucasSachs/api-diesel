import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { UsuarioRelations } from './usuario.relations'

export enum Cargo {
  ADMINISTRADOR = 'admin',
  COLABORADOR = 'colaborador',
}

export enum Status {
  ATIVO = 'ativo',
  INATIVO = 'inativo',
}

@Entity()
export class Usuario extends UsuarioRelations {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @CreateDateColumn()
  created_at: Date

  @Column({
    type: 'enum',
    enum: Cargo,
  })
  cargo: Cargo

  @Column({
    type: 'varchar',
    length: 255,
  })
  email: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  nome: string

  @Column({
    type: 'varchar',
    length: 10,
  })
  rg: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  senha: string

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status
}
