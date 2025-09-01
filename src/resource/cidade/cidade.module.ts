import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cidade } from 'src/database/entities/cidade/cidade.entity'
import { CidadeService } from './cidade.service'

@Module({
  imports: [TypeOrmModule.forFeature([Cidade])],
  providers: [CidadeService],
  exports: [CidadeService],
})
export class CidadeModule {}
