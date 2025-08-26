import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const SessionUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  // Get user request(sended by the guards)
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
