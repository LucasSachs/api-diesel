import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { databaseConnectionConfig } from './database/connection'
import { DatabaseSeederModule } from './lib/seeder/seeder.module'
import { UsuarioModule } from './resource/usuario/usuario.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConnectionConfig),

    UsuarioModule,
    AuthModule,

    DatabaseSeederModule,
  ],
})
export class AppModule {}
