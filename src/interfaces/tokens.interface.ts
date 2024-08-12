export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
export interface TokenPayload {
  sub: string;
  username: string;
}
export interface TokenVerifiedRequest extends Request {
  tokenVerified: TokenPayload;
}
