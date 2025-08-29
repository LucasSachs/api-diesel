import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user'

export class UpdateUsuarioDto extends PartialType(CreateUserDto) {}
