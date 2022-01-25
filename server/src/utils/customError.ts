type StatusCode = 400 | 403 | 404 | 500;

export class ControllerError extends Error {
  statusCode!: number;
  constructor(statusCode: StatusCode, ...params: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super(...params);
    this.name = 'ControllerError';
    this.statusCode = statusCode;
  }
}