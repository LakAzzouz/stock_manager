export interface Usecases<Input, Output> {
    execute(input: Input): Output | Promise<Output>;
  }
  