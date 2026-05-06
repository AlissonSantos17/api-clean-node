import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../validation/validators'
import type { Validation } from '../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const validation of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(validation))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
