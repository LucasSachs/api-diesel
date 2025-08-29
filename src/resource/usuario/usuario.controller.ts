import { Body, Controller, Post } from '@nestjs/common'
import { omit } from 'lodash'
import { CreateUserDto } from './dto/create-user'
import { UsuarioService } from './usuario.service'

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post()
  async createNewUser(@Body() newUser: CreateUserDto) {
    const newCreatedUser = await this.usuarioService.save(newUser)
    const newUserWithouPassword = omit(newCreatedUser, ['senha'])
    return newUserWithouPassword
  }
}
