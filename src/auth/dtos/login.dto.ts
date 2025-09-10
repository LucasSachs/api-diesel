import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail(
    {},
    {
      message: 'O e-mail informado é inválido',
    },
  )
  email: string

  @IsString({
    message: 'A senha informada é inválida',
  })
  @MinLength(1, {
    message: 'A senha deve ter no mínimo $constraint1 caracteres',
  })
  password: string
}
