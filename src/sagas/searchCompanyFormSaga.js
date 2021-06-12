import { call, put, takeEvery } from '@redux-saga/core/effects'

import {
  fetchCompanyFormRequest,
  loadSelectedCompanyFailed,
  loadSelectedCompanySuccess
} from '../redux/searchCompanySlice'

function* searchCompanyFormSaga(action) {
  const companyForm = action.payload
  const companyFormDropDown = []
  const fetchCompanyForm = async () => {
    const res = await fetch(
      `https://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=10&companyForm=${companyForm}`
    )
    const data = await res.json()
    const companyBusinessId = data.results

    {
      companyBusinessId.map(async (companyType) => {
        const resp = await fetch(
          `https://avoindata.prh.fi/opendata/bis/v1/${companyType.businessId}`
        )
        const data = await resp.json()
        const companyFormType = data.results
        companyFormDropDown.push(companyFormType[0])
      })
    }
    console.log('companyFormDropDown1', companyFormDropDown)
  }
  try {
    yield call(fetchCompanyForm)
    console.log('companyFormDropDown2', companyFormDropDown)

    yield put(loadSelectedCompanySuccess(companyFormDropDown))
  } catch (error) {
    yield put(loadSelectedCompanyFailed(error.message))
  }
}

export function* watchsearchCompanyFormSaga() {
  yield takeEvery(fetchCompanyFormRequest.type, searchCompanyFormSaga)
}
