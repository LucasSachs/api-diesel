import { Body, Controller, Delete, NotFoundException, Post, Put } from '@nestjs/common'
import { hash } from 'argon2'
import { omit } from 'lodash'
import { CreateUserDto } from './dto/create-user'
import { DeleteUserDto } from './dto/delete-user'
import { UpdateUserDto } from './dto/update-user.dto'
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

  @Put()
  async updateUser(@Body() updatedUser: UpdateUserDto) {
    // If password informed, hash it using argon2 algorithm
    if (updatedUser.senha) updatedUser.senha = await hash(updatedUser.senha)

    const newUpdatedUser = await this.usuarioService.save(updatedUser)
    const newUpdatedUserWithoutPassword = omit(newUpdatedUser, ['senha'])

    return newUpdatedUserWithoutPassword
  }

  @Delete()
  async deleteUser(@Body() { id }: DeleteUserDto) {
    const deletedUser = await this.usuarioService.delete(id)

    const success = Boolean(deletedUser.affected)
    if (!success) throw new NotFoundException('No user deleted')
  }
}
