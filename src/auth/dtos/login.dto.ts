import { IsEmail, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  email: string

  @MinLength(1, { message: 'A senha deve ter no mínimo $constraint1 caractere' })
  password: string
}
