export interface HttpReponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body: Record<string, string>
}
