import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConnectionConfig } from 'src/database/connection'
import { ClienteModule } from 'src/resource/cliente/cliente.module'
import { ProdutoModule } from 'src/resource/produto/produto.module'
import { ServicoModule } from 'src/resource/servico/servico.module'
import { UsuarioModule } from 'src/resource/usuario/usuario.module'
import { DatabaseSeederService } from './seeder.service'

@Module({
  providers: [DatabaseSeederService],
  imports: [
    TypeOrmModule.forRoot(databaseConnectionConfig),
    UsuarioModule,
    ProdutoModule,
    ServicoModule,
    ClienteModule,
  ],
})
export class DatabaseSeederModule {}
