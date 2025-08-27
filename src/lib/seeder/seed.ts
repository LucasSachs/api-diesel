import { NestFactory } from '@nestjs/core'
import { DatabaseSeederModule } from './seeder.module'
import { DatabaseSeederService } from './seeder.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(DatabaseSeederModule)

  const seeder = app.get(DatabaseSeederService)
  await seeder.seed()

  await app.close()
}

bootstrap()
