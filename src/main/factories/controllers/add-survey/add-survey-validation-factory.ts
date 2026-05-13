import type { Validation } from '../../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const validation of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(validation))
  }
  validations.push(new RequiredFieldValidation('question'))
  validations.push(new RequiredFieldValidation('answers'))
  return new ValidationComposite(validations)
}
