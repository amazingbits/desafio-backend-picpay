type HandleRequestRulesTypesProps = "string" | "number" | "boolean" | "array";

export class HandleRequestRules {
  private errors: string[] = [];
  private counter: number = 0;
  private item: any = null;
  private itemKeyName: string;

  public setItem(item: any, name: string): HandleRequestRules {
    this.errors = [];
    this.counter = 0;
    this.item = item;
    this.itemKeyName = name;
    if (!this.item) {
      this.counter++;
      this.errors.push(`${this.itemKeyName} was not set`);
      return this;
    }
    return this;
  }

  public required() {
    if (!this.item) {
      this.counter++;
      this.errors.push(`${this.itemKeyName} is required`);
      return this;
    }
    return this;
  }

  public type(type: HandleRequestRulesTypesProps) {
    const itemType = typeof this.item;

    if (type === "array") {
      if (!Array.isArray(this.item)) {
        this.counter++;
        this.errors.push(`${this.itemKeyName} must be an array`);
        return this;
      }
    }

    if (itemType !== type) {
      this.counter++;
      this.errors.push(`${this.itemKeyName} must be a ${type}`);
      return this;
    }

    return this;
  }

  public min(min: number) {
    if (this.item) {
      if (this.item.toString().length < min) {
        this.counter++;
        this.errors.push(`${this.itemKeyName} must be at least ${min} characters`);
        return this;
      }
    }

    return this;
  }

  public max(max: number) {
    if (this.item) {
      if (this.item.toString().length > max) {
        this.counter++;
        this.errors.push(`${this.itemKeyName} must be at most ${max} characters`);
        return this;
      }
    }

    return this;
  }

  public email() {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    if (!emailRegex.test(this.item)) {
      this.counter++;
      this.errors.push(`${this.itemKeyName} must be a valid email`);
      return this;
    }

    return this;
  }

  public cpf() {
    let sum = 0;
    let remnant: number;

    const cpf = String(this.item).replace(/[^\d]/g, "");

    if (cpf.length !== 11) {
      this.counter++;
      this.errors.push(`${this.itemKeyName} must be a valid cpf`);
      return this;
    }

    if (
      [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
      ].indexOf(cpf) !== -1
    ) {
      this.counter++;
      this.errors.push(`${this.itemKeyName} must be a valid cpf`);
      return this;
    }

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remnant = (sum * 10) % 11;

    if (remnant === 10 || remnant === 11) {
      remnant = 0;
    }

    if (remnant !== parseInt(cpf.substring(9, 10))) {
      this.counter++;
      this.errors.push(`${this.itemKeyName} must be a valid cpf`);
      return this;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remnant = (sum * 10) % 11;

    if (remnant === 10 || remnant === 11) {
      remnant = 0;
    }

    if (remnant !== parseInt(cpf.substring(10, 11))) {
      this.counter++;
      this.errors.push(`${this.itemKeyName} must be a valid cpf`);
      return this;
    }

    return this;
  }

  public cnpj() {
    let b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let c = String(this.item).replace(/[^\d]/g, "");

    if (c.length !== 14) {
      this.counter++;
      this.errors.push(`${this.itemKeyName} must be a valid cnpj`);
      return this;
    }

    if (/0{14}/.test(c)) {
      this.counter++;
      this.errors.push(`${this.itemKeyName} must be a valid cnpj`);
      return this;
    }

    for (let i = 0, n = 0; i < 12; n += Number(c[i]) * b[++i]) {
      if (Number(c[12]) != ((n %= 11) < 2 ? 0 : 11 - n)) {
        this.counter++;
        this.errors.push(`${this.itemKeyName} must be a valid cnpj`);
        return this;
      }
    }

    for (var i = 0, n = 0; i <= 12; n += Number(c[i]) * b[i++]) {
      if (Number(c[13]) != ((n %= 11) < 2 ? 0 : 11 - n)) {
        this.counter++;
        this.errors.push(`${this.itemKeyName} must be a valid cnpj`);
        return this;
      }
    }

    return this;
  }

  public validate(): boolean {
    return this.counter === 0;
  }

  public getErrors() {
    return this.errors;
  }
}
