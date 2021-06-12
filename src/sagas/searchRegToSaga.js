import { call, put, takeEvery } from '@redux-saga/core/effects'

import {
  fetchRegToRequest,
  loadSelectedCompanyFailed,
  loadSelectedCompanySuccess
} from '../redux/searchCompanySlice'

function* loadRegDateToSaga(action) {
  const registrationDate = action.payload
  const regDates = []
  const fetchRegistrationDate = async () => {
    const res = await fetch(
      `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&companyRegistrationTo=${registrationDate}`
    )
    const data = await res.json()
    const registDates = data.results

    registDates.map(async (regDate) => {
      const resp = await fetch(
        `https://avoindata.prh.fi/opendata/bis/v1/${regDate.businessId}`
      )
      const data = await resp.json()
      const fetchedDate = data.results
      regDates.push(fetchedDate[0])
    })
  }
  try {
    yield call(fetchRegistrationDate)

    yield put(loadSelectedCompanySuccess(regDates))
  } catch (error) {
    yield put(loadSelectedCompanyFailed(error.message))
  }
}

export function* watchLoadRegDateToSaga() {
  yield takeEvery(fetchRegToRequest.type, loadRegDateToSaga)
}
