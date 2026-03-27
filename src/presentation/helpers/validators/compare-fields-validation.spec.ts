import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '../../errors'

const makeSut = (): CompareFieldsValidation =>
  new CompareFieldsValidation('field', 'fieldToCompare')

describe('CompareFieldsValidation', () => {
  it('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'other_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  it('should not return an error if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeNull()
  })
})
