import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeLang } from '../../redux/langSlice'
// import i18n from '../../utils/i18n'

const LanguageComponent = () => {
  const [lang, setLang] = useState('')

  const dispatch = useDispatch()

  return (
    <select
      onChange={(e) => {
        dispatch(changeLang(e.target.value))
        setLang(e.target.value)
      }}
      value={lang}
    >
      <option value="fi">Suomi</option>
      <option value="en">English</option>
    </select>
  )
}

export default LanguageComponent
