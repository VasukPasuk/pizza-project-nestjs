export type AccessToken = {
  accessToken: string
}

export type RefreshToken = {
  refreshToken: string
}

export type TokensPair = AccessToken & RefreshToken