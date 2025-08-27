import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConnectionConfig } from 'src/database/connection'
import { UsuarioModule } from 'src/resource/usuario/usuario.module'
import { DatabaseSeederService } from './seeder.service'

@Module({
  providers: [DatabaseSeederService],
  imports: [
    TypeOrmModule.forRoot(databaseConnectionConfig),
    UsuarioModule,
  ],
})
export class DatabaseSeederModule {}
