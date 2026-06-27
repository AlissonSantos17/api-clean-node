import type { Validation } from '../../../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('Add Survey Validation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const validation of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(validation))
    }
    validations.push(new RequiredFieldValidation('question'))
    validations.push(new RequiredFieldValidation('answers'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
