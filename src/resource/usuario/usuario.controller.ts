import { Body, Controller, Delete, Get, NotFoundException, Post, Put, Query } from '@nestjs/common'
import { hash } from 'argon2'
import { omit } from 'lodash'
import { CreateUserDto } from './dtos/create-user.dto'
import { DeleteUserDto } from './dtos/delete-user.dto'
import { GetUserDto } from './dtos/get-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UsuarioService } from './usuario.service'

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
  ) {}

  @Get()
  async getUsers(@Query() user: GetUserDto) {
    const users = await this.usuarioService.find({ where: user })

    return users
  }

  @Post()
  async createNewUser(@Body() newUser: CreateUserDto) {
    const newCreatedUser = await this.usuarioService.save(newUser)
    const newUserWithoutPassword = omit(newCreatedUser, ['senha'])

    return newUserWithoutPassword
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
