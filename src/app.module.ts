import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { databaseConnectionConfig } from './database/connection'
import { UsuarioModule } from './resource/usuario/usuario.module'
import { ProdutoModule } from './resource/produto/produto.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConnectionConfig),

    UsuarioModule,
    AuthModule,
    ProdutoModule,
  ],
})
export class AppModule {}
