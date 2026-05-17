import type { AccountModel } from '../models/account'

export type Role = 'admin' | 'user'

export interface LoadAccountByToken {
  load: (accessToken: string, role?: Role) => Promise<AccountModel | null>
}
