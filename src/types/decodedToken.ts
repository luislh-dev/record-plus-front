export interface DecodedToken {
  sub: string;
  authorities: string[];
  iat: number;
  exp: number;
}
