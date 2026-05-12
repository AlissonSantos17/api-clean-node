import type { AddSurveyModel } from '../../../../domain/models/add-survey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
