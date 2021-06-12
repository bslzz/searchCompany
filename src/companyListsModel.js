import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  closeCompanyLists,
  loadSelectedCompany
} from './redux/searchCompanySlice'

const CompanyListsModel = ({ companyLists }) => {
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
    <ul
      ref={componentRef}
      style={{
        listStyle: 'none',
        textAlign: '-webkit-left',
        margin: 0,
        padding: 0,
        background: '#f4f4f4'
      }}
    >
      {companyLists &&
        companyLists.map((list, index) => (
          <li
            key={index}
            className="list"
            style={{
              cursor: 'pointer',
              margin: 0,
              padding: '10px'
            }}
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
