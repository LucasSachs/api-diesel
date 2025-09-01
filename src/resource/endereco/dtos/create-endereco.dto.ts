import { Type } from 'class-transformer'
import { IsDefined, IsNumber, IsOptional, IsPositive, Length, ValidateNested } from 'class-validator'
import { CreateCidadeDto } from 'src/resource/cidade/dtos/create-cidade.dto'
import { CreateUfDto } from 'src/resource/uf/dtos/create-uf.dto'

export class CreateEnderecoDto {
  @Length(8, 8)
  cep: string

  @IsOptional()
  @Length(3, 255)
  complemento: string

  @IsNumber()
  lat: number

  @IsNumber()
  long: number

  @IsOptional()
  @IsPositive()
  numero: number

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateCidadeDto)
  cidade: CreateCidadeDto

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateUfDto)
  uf: CreateUfDto
}
