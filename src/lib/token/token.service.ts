import { Injectable } from '@nestjs/common'
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt'
import 'dotenv/config'
import type { UserAccessToken } from 'src/auth/utils/auth.types'
import { InvalidTokenException } from './errors/token.exception.invalid'

export const PUBLIC_KEY = process.env.PUBLIC_KEY
export const PRIVATE_KEY = process.env.PRIVATE_KEY

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async verifyToken(token: string, options?: JwtVerifyOptions) {
    try {
      return await this.jwtService.verifyAsync(token, { publicKey: PUBLIC_KEY, ...options })
    }
    catch { throw new InvalidTokenException() }
  }

  async generateSessionToken(payload: Omit<UserAccessToken, 'iat' | 'exp'>) {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: PRIVATE_KEY,
      expiresIn: 60 * 60 * 24 * 7, // 7 Days
      algorithm: 'RS256',
    })

    return access_token
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token)
  }
}
