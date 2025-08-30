import { IsEmail, IsEnum, IsISO8601, Length } from 'class-validator'
import { Cargo, Status, type Usuario } from 'src/database/entities/usuario/usuario.entity'

export class CreateUserDto implements Partial<Usuario> {
  @IsEnum(Cargo)
  cargo: Cargo

  @IsEmail()
  email: string

  @Length(3, 255)
  nome: string

  @Length(9, 9)
  rg: string

  @IsISO8601()
  data_nascimento: Date

  @Length(11, 11)
  cpf: string

  @IsEnum(Status)
  status: Status
}
