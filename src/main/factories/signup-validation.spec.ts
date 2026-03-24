import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import type { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

const mockValidationComposite = jest.mocked(ValidationComposite)

describe('SignUp Validation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const validation of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(validation))
    }
    expect(mockValidationComposite).toHaveBeenCalledWith(validations)
  })
})
