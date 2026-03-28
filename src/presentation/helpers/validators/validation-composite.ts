import type { Validation } from '../../protocols'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]

  constructor(validations: Validation[]) {
    this.validations = validations
  }

  validate(input: any): Error | null {
    for (const validation of this.validations) {
      const validationError = validation.validate(input)
      if (validationError !== null) return validationError
    }
    return null
  }
}
