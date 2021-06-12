import React from 'react'

const searchByPostBusinessId = () => {
  const companies = []
  console.log('companies', companies)
  const postalBusinessId = action.payload
  console.log('action.payloadPostal', action.payload)
  return (
    <>
      {postalBusinessId.map((postId) => {
        const response = fetch(
          `https://avoindata.prh.fi/opendata/bis/v1/${postId.businessId}`
        )
          .then((data) => data.json())
          .then((data) => {
            const companyName = data.results[0].name

            console.log('companyName', companyName)

            details.name = companyName
          })
          .then((details) => {
            return details
          })
        console.log('res', response)
        companies.push(details)
      })}
    </>
  )
}

export default searchByPostBusinessId
