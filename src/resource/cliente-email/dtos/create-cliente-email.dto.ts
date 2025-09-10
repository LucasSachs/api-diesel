import { IsEmail } from 'class-validator'

export class CreateClienteEmail {
  @IsEmail(
    {},
    {
      message: 'O e-mail informado é inválido',
    },
  )
  descricao: string
}
