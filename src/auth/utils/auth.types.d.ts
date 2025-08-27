import type { Cargo } from 'src/database/entities/usuario/usuario.entity'

export interface UserAccessToken {
  user_id: number
  name: string
  email: string
  role: Cargo
  iat: number
  exp: number
}
