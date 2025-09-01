import { PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsOptional, IsPositive, Length } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class GetUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  id?: number

  @IsOptional()
  @Length(0, 9)
  rg?: CreateUserDto['rg']

  @IsOptional()
  @Length(0, 11)
  cpf?: CreateUserDto['cpf']
}
