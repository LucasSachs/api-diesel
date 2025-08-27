import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove fields that are not mapped in the DTO
  }))

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
