import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, MenuItem } from '@material-ui/core'
import { Form, Field } from 'react-final-form'
import { renderTextField, renderSelectField } from '../../utils/wrappers'
import { useStyles } from './advanceSearch.style'
import axios from 'axios'
// import { loadPostalCodeRequest } from '../../redux/searchPostalCodeSlice'
import { useDispatch } from 'react-redux'
import {
  // fetchCompanyFormRequest,
  // fetchMunicipalityRequest,
  // fetchPostalCodeRequest,

  // fetchRegToRequest,
  loadSelectedCompany,
  loadSelectedCompanySuccess,
  resetCompanyLists
} from '../../redux/searchCompanySlice'
// import { loadMunicipalitiesRequest } from '../../redux/searchMunicipalitiesSlice'
// import { loadCompanyFormRequest } from '../../redux/searchCompanyFormSlice'
// import { loadRegFromRequest } from '../../redux/searchRegFromDateSlice'
// import { loadCompanyFormRequest } from '../../redux/searchCompanyFormSlice'
import Select from 'react-select'
// import businessLines from '../../utils/companyData'
import { useTranslation } from 'react-i18next'

const AdvanceSearch = () => {
  const { t } = useTranslation('searchContainer')
  const classes = useStyles()
  const dispatch = useDispatch()
  const DropDown = [
    { value: '', text: <em>None</em> },
    { value: 'AOY', text: t('Housing company') },
    { value: 'OYJ', text: t('Public limited company') },
    { value: 'OY', text: t('Limited company') },
    { value: 'OK', text: t('Co-operative') },
    { value: 'VOJ', text: t('Public limited insurance company') }
  ]

  const lines = {
    '01': t(
      'businessLines:Crop and animal production, hunting and related service activities'
    ),
    '02': t('businessLines:Forestry and logging'),
    '03': t('businessLines:Fishing and aquaculture'),
    '05': t('businessLines:Mining of coal and lignite'),
    '06': t('businessLines:Extraction of crude petroleum and natural gas'),
    '07': t('businessLines:Mining of metal ores'),
    '08': t('businessLines:Other mining and quarrying'),
    '09': t('businessLines:Mining support service activities'),
    10: t('businessLines:Manufacture of food products'),
    11: t('businessLines:Manufacture of beverages'),
    12: t('businessLines:Manufacture of tobacco products'),
    13: t('businessLines:Manufacture of textiles'),
    14: t('businessLines:Manufacture of wearing apparel'),
    15: t('businessLines:Manufacture of leather and related products'),
    16: t(
      'businessLines:Manufacture of wood and of products of wood and cork, except furniture; manufacture of articles of straw and plaiting materials'
    ),
    17: t('businessLines:Manufacture of paper and paper products'),
    18: t('businessLines:Printing and reproduction of recorded media'),
    19: t('businessLines:Manufacture of coke and refined petroleum products'),
    20: t('businessLines:Manufacture of chemicals and chemical products'),
    21: t(
      'businessLines:Manufacture of basic pharmaceutical products and pharmaceutical preparations'
    ),
    22: t('businessLines:Manufacture of rubber and plastic products'),
    23: t('businessLines:Manufacture of other non-metallic mineral products'),
    24: t('businessLines:Manufacture of basic metals'),
    25: t(
      'businessLines:Manufacture of fabricated metal products, except machinery and equipment'
    ),
    26: t(
      'businessLines:Manufacture of computer, electronic and optical products'
    ),
    27: t('businessLines:Manufacture of electrical equipment'),
    28: t('businessLines:Manufacture of machinery and equipment n.e.c.'),
    29: t(
      'businessLines:Manufacture of motor vehicles, trailers and semi-trailers'
    ),
    30: t('businessLines:Manufacture of other transport equipment'),
    31: t('businessLines:Manufacture of furniture'),
    32: t('businessLines:Other manufacturing'),
    33: t('businessLines:Repair and installation of machinery and equipment'),
    35: t('businessLines:Electricity, gas, steam and air conditioning supply'),
    36: t('businessLines:Water collection, treatment and supply'),
    37: t('businessLines:Sewerage'),
    38: t(
      'businessLines:Waste collection, treatment and disposal activities; materials recovery'
    ),
    39: t(
      'businessLines:Remediation activities and other waste management services'
    ),
    41: t('businessLines:Construction of buildings'),
    42: t('businessLines:Civil engineering'),
    43: t('businessLines:Specialised construction activities'),
    45: t(
      'businessLines:Wholesale and retail trade and repair of motor vehicles and motorcycles'
    ),
    46: t(
      'businessLines:Wholesale trade, except of motor vehicles and motorcycles'
    ),
    47: t(
      'businessLines:Retail trade, except of motor vehicles and motorcycles'
    ),
    49: t('businessLines:Land transport and transport via pipelines'),
    50: t('businessLines:Water transport'),
    51: t('businessLines:Air transport'),
    52: t(
      'businessLines:Warehousing and support activities for transportation'
    ),
    53: t('businessLines:Postal and courier activities'),
    55: t('businessLines:Accommodation'),
    56: t('businessLines:Food and beverage service activities'),
    58: t('businessLines:Publishing activities'),
    59: t(
      'businessLines:Motion picture, video and television programme production, sound recording and music publishing activities'
    ),
    60: t('businessLines:Programming and broadcasting activities'),
    61: t('businessLines:Telecommunications'),
    62: t(
      'businessLines:Computer programming, consultancy and related activities'
    ),
    63: t('businessLines:Information service activities'),
    64: t(
      'businessLines:Financial service activities, except insurance and pension funding'
    ),
    65: t(
      'businessLines:Insurance, reinsurance and pension funding, except compulsory social security'
    ),
    66: t(
      'businessLines:Activities auxiliary to financial services and insurance activities'
    ),

    68: t('businessLines:Real estate activities'),
    69: t('businessLines:Legal and accounting activities'),
    70: t(
      'businessLines:Activities of head offices; management consultancy activities'
    ),
    71: t(
      'businessLines:Architectural and engineering activities; technical testing and analysis'
    ),
    72: t('businessLines:Scientific research and development'),
    73: t('businessLines:Advertising and market research'),
    74: t(
      'businessLines:Other professional, scientific and technical activities'
    ),
    75: t('businessLines:Veterinary activities'),
    77: t('businessLines:Rental and leasing activities'),
    78: t('businessLines:Employment activities'),
    79: t(
      'businessLines:Travel agency, tour operator and other reservation service and related activities'
    ),
    80: t('businessLines:Security and investigation activities'),
    81: t('businessLines:Services to buildings and landscape activities'),
    82: t(
      'businessLines:Office administrative, office support and other business support activities'
    ),
    84: t(
      'businessLines:Public administration and defence; compulsory social security'
    ),
    85: t('businessLines:Education'),
    86: t('businessLines:Human health activities'),
    87: t('businessLines:Residential care activities'),
    88: t('businessLines:Social work activities without accommodation'),
    90: t('businessLines:Creative, arts and entertainment activities'),
    91: t(
      'businessLines:Libraries, archives, museums and other cultural activities'
    ),
    92: t('businessLines:Gambling and betting activities'),
    93: t(
      'businessLines:Sports activities and amusement and recreation activities'
    ),
    94: t('businessLines:Activities of membership organisations'),
    95: t('businessLines:Repair of computers and personal and household goods'),
    96: t('businessLines:Other personal service activities'),
    97: t(
      'businessLines:Activities of households as employers of domestic personnel'
    ),
    98: t(
      'businessLines:Undifferentiated goods- and services-producing activities of private households for own use'
    ),
    99: t(
      'businessLines:Activities of extraterritorial organisations and bodies'
    ),
    '00': t('businessLines:Industry unknown')
  }

  const businessLines = Object.keys(lines).map((value) => ({
    value,
    label: lines[value]
  }))

  useEffect(() => {
    return () => {
      dispatch(resetCompanyLists())
    }
  }, [])

  const companies = []
  const fetchPostalCodes = async (postId) => {
    const res = await axios.get(
      `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=100&resultsFrom=0&streetAddressPostCode=${postId}`
    )
    console.log(res.data.previousResultsUri)
    console.log(res.data.nextResultsUri)

    const postalBusinessId = res.data.results

    {
      postalBusinessId.map(async (postId) => {
        const response = await axios.get(
          `https://avoindata.prh.fi/opendata/bis/v1/${postId.businessId}`
        )
        const companyName = response.data.results
        companies.push(companyName[0])

        dispatch(loadSelectedCompanySuccess(companies))
      })
    }
  }

  const municipalities = []
  const fetchMunicipalities = async (municipality) => {
    const res = await axios.get(
      `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&registeredOffice=${municipality}`
    )
    const postalBusinessId = res.data.results
    {
      postalBusinessId.map(async (municipality) => {
        const response = await axios.get(
          `https://avoindata.prh.fi/opendata/bis/v1/${municipality.businessId}`
        )
        const companyName = response.data.results
        municipalities.push(companyName[0])

        console.log('municipalities', municipalities)
        dispatch(resetCompanyLists())
        dispatch(loadSelectedCompanySuccess(municipalities))
      })
    }
  }

  const companyFormDropDown = []
  const fetchCompanyForm = async (companyForm) => {
    const res = await axios.get(
      `https://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=10&companyForm=${companyForm}`
    )
    const companyBusinessId = res.data.results
    {
      companyBusinessId.map(async (companyType) => {
        const response = await axios.get(
          `https://avoindata.prh.fi/opendata/bis/v1/${companyType.businessId}`
        )
        const companyFormType = response.data.results
        companyFormDropDown.push(companyFormType[0])

        dispatch(loadSelectedCompanySuccess(companyFormDropDown))
      })
    }
  }

  const registrationFrom = []
  const fetchRegistrationFrom = async (registrationDate) => {
    const res = await axios.get(
      `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&companyRegistrationFrom=${registrationDate}`
    )
    const registrationFromDate = res.data.results
    {
      registrationFromDate.map(async (comp) => {
        const response = await axios.get(
          `https://avoindata.prh.fi/opendata/bis/v1/${comp.businessId}`
        )
        const fetchedDate = response.data.results
        registrationFrom.push(fetchedDate[0])

        dispatch(loadSelectedCompanySuccess(registrationFrom))
      })
    }
  }

  const registrationTo = []
  const fetchRegistrationTo = async (registrationDate) => {
    const res = await axios.get(
      `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&companyRegistrationTo=${registrationDate}`
    )
    const registrationToDate = res.data.results
    {
      registrationToDate.map(async (comp) => {
        const response = await axios.get(
          `https://avoindata.prh.fi/opendata/bis/v1/${comp.businessId}`
        )
        const fetchedDate = response.data.results
        registrationTo.push(fetchedDate[0])

        dispatch(loadSelectedCompanySuccess(registrationTo))
      })
    }
  }

  const lineOfBusiness = []
  const fetchBusinessLines = async (businessLines) => {
    const res = await axios.get(
      `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&businessLineCode=${businessLines}`
    )
    const mainBusinessLines = res.data.results
    {
      mainBusinessLines.map(async (comp) => {
        const response = await axios.get(
          `https://avoindata.prh.fi/opendata/bis/v1/${comp.businessId}`
        )
        const fetchedDate = response.data.results
        lineOfBusiness.push(fetchedDate[0])

        dispatch(loadSelectedCompanySuccess(lineOfBusiness))
      })
    }
  }

  const onSubmit = (values) => {
    dispatch(resetCompanyLists())
    const businessId = values.BusinessId
    const postalId = values.PostalId
    const municipality = values.Municipality
    const companyForm = values.companyForm
    const registrationFrom = values.registrationFrom
    const registrationTo = values.registrationTo
    const businessLine = values.businessLine && values.businessLine.value

    if (businessId && !/^\d{7}-\d{1}$/i.test(businessId)) {
      alert('Invalid business Id')
    } else if (businessId && businessId.length) {
      dispatch(
        loadSelectedCompany(
          `https://avoindata.prh.fi/opendata/bis/v1/${businessId}`
        )
      )
    } else null

    if (postalId && !/^\d{5}$/i.test(postalId)) {
      alert('Invalid postalId')
    } else if (postalId && postalId.length) {
      // dispatch(fetchPostalCodeRequest(postalId))
      fetchPostalCodes(postalId)
    } else null

    if (municipality && municipality.length) {
      // dispatch(fetchMunicipalityRequest(municipality))
      fetchMunicipalities(municipality)
    } else null

    if (companyForm && companyForm.length) {
      // dispatch(fetchCompanyFormRequest(companyForm))
      fetchCompanyForm(companyForm)
    } else null

    if (registrationFrom && registrationFrom.length) {
      fetchRegistrationFrom(registrationFrom)
    } else null

    if (registrationTo && registrationTo.length) {
      fetchRegistrationTo(registrationTo)
    } else null

    if (businessLine && businessLine.length) {
      fetchBusinessLines(businessLine)
    } else null
  }

  const ReactSelectAdapter = ({ input, ...rest }) => (
    <Select {...input} {...rest} isSearchable isClearable />
  )
  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>{t('Filter your search')}:</h2>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Field
                  name="BusinessId"
                  type="text"
                  label={t('Business ID')}
                  component={renderTextField}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Field
                  name="PostalId"
                  type="text"
                  label={t('Postal code')}
                  component={renderTextField}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Field
                  name="Municipality"
                  type="text"
                  label={t('Municipality')}
                  component={renderTextField}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {/* <Grid item xs={12} md={4}>
                <Field
                  name="registrationFrom"
                  type="text"
                  label="Registration From"
                  placeholder="YYYY-MM-DD"
                  component={renderTextField}
                />
              </Grid> */}
              <Grid item xs={12} md={4}>
                <Field
                  name="registrationTo"
                  type="text"
                  label={t('Registration Till')}
                  placeholder="YYYY-MM-DD"
                  component={renderTextField}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Field
                  name="companyForm"
                  label={t('Company Form')}
                  component={renderSelectField}
                >
                  {DropDown.map((companyForm) => (
                    <MenuItem key={companyForm.value} value={companyForm.value}>
                      {companyForm.text}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} md={4}>
                <Field
                  component={ReactSelectAdapter}
                  options={businessLines}
                  name="businessLine"
                  placeholder={t('Line of business')}
                />
              </Grid>
            </Grid>

            <div className={classes.searchBtnDiv}>
              <Button type="submit" className={classes.searchBtn}>
                {t('Search')}
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default AdvanceSearch
