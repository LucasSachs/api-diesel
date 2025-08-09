import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  tseslint.configs.recommended,
  stylistic.configs.recommended,
)
