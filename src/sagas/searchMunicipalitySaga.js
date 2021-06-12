import { call, put, takeEvery } from '@redux-saga/core/effects'

import {
  fetchMunicipalityRequest,
  loadSelectedCompanyFailed,
  loadSelectedCompanySuccess
} from '../redux/searchCompanySlice'

function* loadMunicipalitySaga(action) {
  try {
    const municipality = action.payload
    const municipalities = []
    const fetchMunicipalities = async () => {
      const res = await fetch(
        `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&registeredOffice=${municipality}`
      )
      const data = await res.json()

      const postalBusinessId = data.results

      postalBusinessId.map(async (municipality) => {
        const resp = await fetch(
          `https://avoindata.prh.fi/opendata/bis/v1/${municipality.businessId}`
        )
        const data = await resp.json()
        const companyName = data.results
        municipalities.push(companyName[0])
      })
    }

    yield call(fetchMunicipalities)
    console.log('municipalities', municipalities)
    yield put(loadSelectedCompanySuccess(municipalities))
  } catch (error) {
    yield put(loadSelectedCompanyFailed(error.message))
  }
}

export function* watchLoadMunicipalitySaga() {
  yield takeEvery(fetchMunicipalityRequest.type, loadMunicipalitySaga)
}
