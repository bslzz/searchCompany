import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  closeCompanyLists,
  loadSelectedCompany
} from '../redux/searchCompanySlice'

const CompanyListsModel = ({ classes, companyLists }) => {
  const dispatch = useDispatch()
  const componentRef = useRef()

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
    function handleClick(e) {
      if (componentRef && componentRef.current) {
        const ref = componentRef.current
        if (!ref.contains(e.target)) {
          dispatch(closeCompanyLists())
        }
      }
    }
  }, [dispatch])

  return (
    <ul ref={componentRef} className={classes.companyDropDownListsUL}>
      {companyLists &&
        companyLists.map((list, index) => (
          <li
            key={index}
            className={classes.companyDropDownListsLI}
            onClick={() =>
              dispatch(
                loadSelectedCompany(
                  list.detailsUri == null
                    ? `https://avoindata.prh.fi/opendata/bis/v1/${list.businessId}`
                    : list.detailsUri &&
                        list.detailsUri.replace(/http/g, 'https')
                )
              )
            }
          >
            {list.name}
          </li>
        ))}
    </ul>
  )
}

export default CompanyListsModel
