export interface HandleFunction<T> {
  (values: T): Promise<boolean>
}
