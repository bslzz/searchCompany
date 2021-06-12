import { takeEvery } from 'redux-saga/effects'
import { changeLang } from '../redux/langSlice'
import i18n from '../utils/i18n'

function* changeLanguage(action) {
  try {
    yield i18n.changeLanguage(action.payload)
  } catch (error) {
    console.warn(error)
  }
}
export function* watchChangeLanguageSaga() {
  yield takeEvery(changeLang, changeLanguage)
}
