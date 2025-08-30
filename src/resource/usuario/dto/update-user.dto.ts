import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsPositive, IsStrongPassword } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsPositive()
  id: number

  @IsOptional()
  @IsStrongPassword()
  senha?: string
}
