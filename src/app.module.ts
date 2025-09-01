import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { databaseConnectionConfig } from './database/connection'
import { CidadeModule } from './resource/cidade/cidade.module'
import { ClienteModule } from './resource/cliente/cliente.module'
import { ProdutoModule } from './resource/produto/produto.module'
import { UfModule } from './resource/uf/uf.module'
import { UsuarioModule } from './resource/usuario/usuario.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConnectionConfig),

    UsuarioModule,
    AuthModule,
    ProdutoModule,
    ClienteModule,
    CidadeModule,
    UfModule,
  ],
})
export class AppModule {}
