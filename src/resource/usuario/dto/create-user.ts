import { IsEmail, IsEnum, Length } from 'class-validator'
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

  @IsEnum(Status)
  status: Status
}
