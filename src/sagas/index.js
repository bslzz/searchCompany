import { all } from 'redux-saga/effects'
import { watchChangeLanguageSaga } from './lang.saga'
import { watchCompanyDetailsSearch, watchloadSelectedCompanySaga } from './searchCompanySaga'

import { watchLoadMunicipalitySaga } from './searchMunicipalitySaga'
import { watchLoadPostalCodeSaga } from './searchPostalCodeSaga'
import { watchLoadRegDateToSaga } from './searchRegToSaga'

export default function* rootSaga() {
  yield all([
    watchCompanyDetailsSearch(),
    watchloadSelectedCompanySaga(),
    watchLoadPostalCodeSaga(),
    watchLoadMunicipalitySaga(),
    watchLoadRegDateToSaga(),
    watchChangeLanguageSaga()
  ])
}
