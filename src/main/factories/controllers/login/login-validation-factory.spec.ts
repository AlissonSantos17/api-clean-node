import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../presentation/helpers/validators'
import type { Validation } from '../../../../presentation/protocols'
import type { EmailValidator } from '../../../../presentation/protocols/email-validator'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(_email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Login Validation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const validation of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(validation))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
