export abstract class RequestBase {
  protected static errors: Array<string> = [];
  protected static errorCounter: number = 0;

  public static validate(request: any): boolean {
    return this.errorCounter === 0;
  }

  public static getErrors(): Array<string> {
    return this.errors;
  }
}
