import React from 'react'
import {
  Paper,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  createMuiTheme,
  ThemeProvider,
  Container,
  Button
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined'
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined'
import WorkOutlinedIcon from '@material-ui/icons/WorkOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTranslation } from 'react-i18next'

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        border: '1px solid #000',
        borderBottom: '1px solid #000'
      }
    }
  }
})

const CompanyInfoTable = ({ classes, clickExcel }) => {
  const { t } = useTranslation('searchContainer')
  const selectedCompanyDetails = useSelector(
    (state) => state.companyList.companyDetails
  )
  const lang = useSelector((state) => state.language.lang)

  console.log('companyDetails', selectedCompanyDetails)

  const Spinner = useSelector((state) => state.companyList.spinner)
  console.log('spinner', Spinner)

  return (
    <div className={classes.resultTable}>
      {!selectedCompanyDetails.length ? (
        ''
      ) : (
        <>
          {Spinner == true ? (
            <CircularProgress />
          ) : (
            <Container>
              <div className={classes.downloadBtn}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={clickExcel}
                >
                  {t('Download')}
                </Button>
              </div>
              <Paper>
                <Table>
                  <ThemeProvider theme={theme}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <span className={classes.tableHead}>
                            {t('Company Name')}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={classes.tableHead}>
                            {t('Business ID')}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={classes.tableHead}>
                            {t('Address')}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={classes.tableHead}>
                            {t('Other info')}
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {selectedCompanyDetails.map((item, index) => {
                        // phoneArray type check
                        const phoneArray =
                          item.contactDetails && item.contactDetails
                        const phoneNum = (el) =>
                          el.type === 'Matkapuhelin' || el.type === 'Puhelin'
                        const ind =
                          phoneArray && phoneNum
                            ? phoneArray.findIndex(phoneNum)
                            : ''

                        // websiteArray type
                        const websiteArray =
                          item.contactDetails && item.contactDetails

                        const urlInd = (el) =>
                          el.type === 'Kotisivun www-osoite' ||
                          el.type === 'www-adress'

                        const URLind = websiteArray
                          ? websiteArray.findIndex(urlInd)
                          : ''

                        // businessLines
                        const businessLines =
                          item.businessLines && item.businessLines
                        const businessLine = (el) =>
                          lang === 'en'
                            ? el.language == 'EN'
                            : el.language == 'FI'

                        const businessLineIndex = businessLines
                          ? businessLines.findIndex(businessLine)
                          : ''
                        // companyForms
                        const companyForms =
                          item.companyForms && item.companyForms
                        const companyForm = (el) =>
                          lang === 'en'
                            ? el.language == 'EN'
                            : el.language == 'FI'

                        const companyFormIndex = companyForms
                          ? companyForms.findIndex(companyForm)
                          : ''

                        return (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>

                            <TableCell>
                              <span style={{ whiteSpace: 'nowrap' }}>
                                {item.businessId}
                              </span>
                            </TableCell>

                            <TableCell>
                              <div className={classes.companyInfoIcons}>
                                <RoomOutlinedIcon
                                  className={classes.infoIcon}
                                />
                                <div>
                                  <p>
                                    {item.addresses[0]
                                      ? item.addresses[0].street
                                      : (item.addresses[2] &&
                                          item.addresses[2].street) ||
                                        (item.addresses[1] &&
                                          item.addresses[1].street)}
                                  </p>

                                  <p>
                                    {item.addresses[0]
                                      ? item.addresses[0].postCode
                                      : (item.addresses[2] &&
                                          item.addresses[2].postCode) ||
                                        (item.addresses[1] &&
                                          item.addresses[1].postCode)}
                                  </p>

                                  <p>
                                    {item.addresses[0]
                                      ? item.addresses[0].city
                                      : (item.addresses[2] &&
                                          item.addresses[2].city) ||
                                        (item.addresses[1] &&
                                          item.addresses[1].city)}
                                  </p>

                                  <p>
                                    {t('RegistedMunicipality')} :{' '}
                                    {item.registedOffices[0] &&
                                      item.registedOffices[0].name}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className={classes.companyInfoIcons}>
                                {item.companyForms[2] && (
                                  <BusinessOutlinedIcon
                                    className={classes.infoIcon}
                                  />
                                )}
                                {companyFormIndex !== -1
                                  ? item.companyForms[companyFormIndex] &&
                                    item.companyForms[companyFormIndex].name
                                  : ''}
                              </div>
                              <br />
                              <div className={classes.companyInfoIcons}>
                                {item.businessLines[0] && (
                                  <WorkOutlinedIcon
                                    className={classes.infoIcon}
                                  />
                                )}
                                {businessLineIndex !== -1
                                  ? item.businessLines[businessLineIndex] &&
                                    item.businessLines[businessLineIndex].name
                                  : ''}
                              </div>
                              <br />
                              <div className={classes.companyInfoIcons}>
                                {item.contactDetails[ind] && (
                                  <PhoneOutlinedIcon
                                    className={classes.infoIcon}
                                  />
                                )}
                                {ind !== -1
                                  ? item.contactDetails[ind] &&
                                    item.contactDetails[ind].value
                                  : ''}
                              </div>
                              <br />
                              <div className={classes.companyInfoIcons}>
                                {item.contactDetails[URLind] && (
                                  <LanguageOutlinedIcon
                                    className={classes.infoIcon}
                                  />
                                )}
                                {URLind !== -1
                                  ? item.contactDetails[URLind] &&
                                    item.contactDetails[URLind].value
                                  : ''}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </ThemeProvider>
                </Table>
              </Paper>
            </Container>
          )}
        </>
      )}
    </div>
  )
}

export default CompanyInfoTable
