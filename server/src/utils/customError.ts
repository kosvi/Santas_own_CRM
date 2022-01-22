export class ControllerError extends Error {
  statusCode!: number;
  constructor(statusCode: number, ...params: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super(...params);
    this.name = 'ControllerError';
    this.statusCode = statusCode;
  }
}