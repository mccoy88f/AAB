import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env['JWT_SECRET'] ?? 'dev_secret_change_me'
const JWT_REFRESH_SECRET = process.env['JWT_REFRESH_SECRET'] ?? 'dev_refresh_secret_change_me'

export interface TokenPayload { userId: string }

export const signAccessToken  = (p: TokenPayload) => jwt.sign(p, JWT_SECRET, { expiresIn: '15m' })
export const signRefreshToken = (p: TokenPayload) => jwt.sign(p, JWT_REFRESH_SECRET, { expiresIn: '30d' })
export const verifyAccessToken  = (t: string) => jwt.verify(t, JWT_SECRET) as TokenPayload
export const verifyRefreshToken = (t: string) => jwt.verify(t, JWT_REFRESH_SECRET) as TokenPayload
