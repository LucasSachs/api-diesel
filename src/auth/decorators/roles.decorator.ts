import { Reflector } from '@nestjs/core'
import type { Cargo } from 'src/database/entities/usuario/usuario.entity'

export const Roles = Reflector.createDecorator<Cargo[]>()
