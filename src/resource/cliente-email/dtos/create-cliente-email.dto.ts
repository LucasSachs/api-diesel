import { IsEmail } from 'class-validator'

export class CreateClienteEmail {
  @IsEmail()
  descricao: string
}
