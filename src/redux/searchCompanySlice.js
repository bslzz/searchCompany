import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  companies: [],
  loading: false,
  error: null,
  apiSuccess: false,
  companyDetails: [],
  spinner: false
}

const searchCompanySlice = createSlice({
  name: 'searchCompany',
  initialState,
  reducers: {
    searchCompany(state) {
      state.loading = true
      state.error = null
      state.apiSuccess = true
      state.companies = []
    },

    searchCompanySuccess(state, action) {
      state.loading = false
      state.companies = action.payload
      state.apiSuccess = true
      state.error = null
    },
    searchCompanyFailed(state, action) {
      state.loading = false
      state.error = action.payload
    },

    loadSelectedCompany(state) {
      state.apiSuccess = false
    },

    fetchCompanyFormRequest(state) {
      state.spinner = true
    },
    fetchMunicipalityRequest(state) {
      state.spinner = true
    },
    fetchPostalCodeRequest(state) {
      state.spinner = true
    },
    fetchRegToRequest(state) {
      state.spinner = true
    },
    loadSelectedCompanySuccess(state, action) {
      console.log('loadSelectedCompanySuccessAction', action.payload)
      state.loading = false
      state.apiSuccess = false
      state.companyDetails = [...action.payload]
      state.spinner = false
    },

    loadSelectedCompanyFailed(state, action) {
      state.error = action.payload
      state.spinner = false
    },
    closeCompanyLists(state) {
      state.apiSuccess = false
    },

    resetCompanyLists: (state) => {
      state.companyDetails = []
    }
  }
})

export const {
  searchCompany,
  searchCompanySuccess,
  searchCompanyFailed,
  loadSelectedCompany,
  loadSelectedCompanySuccess,
  loadSelectedCompanyFailed,
  closeCompanyLists,
  resetCompanyLists,
  fetchCompanyFormRequest,
  fetchMunicipalityRequest,
  fetchPostalCodeRequest,
  fetchRegToRequest
} = searchCompanySlice.actions
export default searchCompanySlice.reducer
