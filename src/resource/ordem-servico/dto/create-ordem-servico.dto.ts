import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsPositive, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator'
import { Status } from 'src/database/entities/ordem-servico/ordem-servico.entity'
import { CreateOrdemServicoProdutoDto } from 'src/resource/ordem-servico-produto/dto/create-ordem-servico-produto.dto'

export class CreateOrdemServicoDto {
  @IsEnum(Status, { message: 'Status inválido' })
  status: Status

  @IsPositive({ message: 'Valor de deslocamento inválido' })
  valor_deslocamento: number

  @IsPositive({ message: 'Valor de mão de obra inválido' })
  valor_mo: number

  @IsPositive({ message: 'ID de propriedade inválido' })
  propriedade_id: number

  @IsString({ message: 'A descrição da Ordem de Serviço deve ser enviada como string' })
  @MinLength(3, { message: 'A descrição da Ordem de Serviço deve ter pelo menos 3 caracteres' })
  @MaxLength(255, { message: 'A descrição da Ordem de Serviço deve ter no máximo 255 caracteres' })
  descricao: string

  @IsArray({ message: 'Os produtos devem ser enviados como uma array' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrdemServicoProdutoDto)
  ordem_servico_produtos: CreateOrdemServicoProdutoDto[]

  @IsArray({ message: 'Os serviços devem ser enviados como uma array' })
  @IsNumber({}, { each: true, message: 'Os serviços devem ser enviados como seu ID único' })
  @ArrayMinSize(1, { message: 'Uma ordem de serviço deve ter pelo menos um serviço' })
  servicos: number[]

  @IsArray({ message: 'Os usuários devem ser enviados como uma array' })
  @IsNumber({}, { each: true, message: 'Os usuários devem ser enviados como seu ID único' })
  @ArrayMinSize(1, { message: 'Uma ordem de serviço deve ter pelo menos um usuário responsável' })
  usuarios: number[]
}
