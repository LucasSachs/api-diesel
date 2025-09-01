import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Uf } from 'src/database/entities/uf/uf.entity'
import { UfService } from './uf.service'

@Module({
  imports: [TypeOrmModule.forFeature([Uf])],
  providers: [UfService],
  exports: [UfService],
})
export class UfModule {}
