import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  loadSelectedCompany,
  loadSelectedCompanySuccess,
  searchCompany,
  searchCompanyFailed,
  searchCompanySuccess
} from '../redux/searchCompanySlice'

function* companyDetailsSearch(action) {
  try {
    const api = 'https://avoindata.prh.fi/bis/v1/?name='
    const url = `${api}${action.payload}`

    const response = yield call(fetch, url)
    const data = yield call([response, response.json])
    const companyDetails = data.results

    yield put(searchCompanySuccess(companyDetails))
  } catch (err) {
    yield put(searchCompanyFailed(err.message))
  }
}

function* loadSelectedCompanySaga(action) {
  try {
    const response = yield call(fetch, action.payload)
    const data = yield call([response, response.json])
    const selectedCompanyDetails = data.results
    yield put(loadSelectedCompanySuccess(selectedCompanyDetails))
  } catch (error) {
    console.log(error)
  }
}

export function* watchCompanyDetailsSearch() {
  yield takeEvery(searchCompany.type, companyDetailsSearch)
}
export function* watchloadSelectedCompanySaga() {
  yield takeEvery(loadSelectedCompany.type, loadSelectedCompanySaga)
}
