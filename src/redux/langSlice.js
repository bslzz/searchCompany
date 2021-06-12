import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lang: 'fi'
}
const changeLanguageSlice = createSlice({
  name: 'changeLanguage',
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload
    }
  }
})

export const { changeLang } = changeLanguageSlice.actions
export default changeLanguageSlice.reducer
