import { call, put, takeEvery } from '@redux-saga/core/effects'

import {
  fetchPostalCodeRequest,
  loadSelectedCompanyFailed,
  loadSelectedCompanySuccess
} from '../redux/searchCompanySlice'

function* loadPostalCodeSaga(action) {
  try {
    const postId = action.payload
    console.log('postIddd', postId)
    const companies = []
    const fetchPostalCodes = async () => {
      const res = await fetch(
        `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&streetAddressPostCode=${postId}`
      )
      // console.log(res.data.previousResultsUri)
      // console.log(res.data.nextResultsUri)

      const data = await res.json()
      const postalBusinessId = await data.results

      {
        postalBusinessId.map(async (postId) => {
          const resp = await fetch(
            `https://avoindata.prh.fi/opendata/bis/v1/${postId.businessId}`
          )
          const data = await resp.json()
          const companyName = await data.results
          console.log('ccompaniesoma', companies)
          console.log('coma', companyName)
          companies.push(companyName[0])
        })
      }
      return companies
    }

    console.log('after map', companies)

    yield call(fetchPostalCodes)

    yield put(loadSelectedCompanySuccess(companies))
  } catch (error) {
    yield put(loadSelectedCompanyFailed(error.message))
  }
}

export function* watchLoadPostalCodeSaga() {
  yield takeEvery(fetchPostalCodeRequest.type, loadPostalCodeSaga)
}
