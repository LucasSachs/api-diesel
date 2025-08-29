import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsPositive } from 'class-validator'
import { CreateUserDto } from './create-user'

export class GetUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsPositive()
  id?: number
}
