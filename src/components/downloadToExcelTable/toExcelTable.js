import React from 'react'

import {
  Paper,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Container
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const DownloadTableComponent = ({ btnRef }) => {
  const { t } = useTranslation('searchContainer')
  const selectedCompanyDetails = useSelector(
    (state) => state.companyList.companyDetails
  )

  const lang = useSelector((state) => state.language.lang)

  return (
    <>
      {!selectedCompanyDetails.length ? (
        ''
      ) : (
        <Container style={{ display: 'none' }}>
          <Paper>
            <Table ref={btnRef}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span>{t('Company Name')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Auxiliary company')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Business ID')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Registration Till')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Line of business')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Company Form')}</span>
                  </TableCell>

                  <TableCell>
                    <span> {t('Website URL')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Telephone')}</span>
                  </TableCell>

                  <TableCell>
                    <span>{t('Address')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Postal code')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Trade register')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Tax Administration')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Prepayment register')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Value added tax-liability')}</span>
                  </TableCell>
                  <TableCell>
                    <span>{t('Employer register')}</span>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {selectedCompanyDetails.map((item, index) => {
                  // phoneArray type check
                  const phoneArray = item.contactDetails && item.contactDetails
                  const phoneNum = (el) =>
                    el.type === 'Matkapuhelin' || el.type === 'Puhelin'
                  const ind =
                    phoneArray && phoneNum ? phoneArray.findIndex(phoneNum) : ''

                  // websiteArray type
                  const websiteArray =
                    item.contactDetails && item.contactDetails

                  const urlInd = (el) =>
                    el.type === 'Kotisivun www-osoite' ||
                    el.type === 'www-adress'

                  const URLind = websiteArray
                    ? websiteArray.findIndex(urlInd)
                    : ''

                  // trade register
                  const tradeRegister =
                    item.registeredEntries && item.registeredEntries

                  const registerType = (el) =>
                    lang === 'en'
                      ? el.authority == 2 &&
                        el.register == 1 &&
                        el.status == 1 &&
                        el.language == 'EN'
                      : el.authority == 2 &&
                        el.register == 1 &&
                        el.status == 1 &&
                        el.language == 'FI'

                  const tradeRegIndex = tradeRegister
                    ? tradeRegister.findIndex(registerType)
                    : ''

                  // Tax Administration
                  const taxAdmin = (el) =>
                    lang === 'en'
                      ? el.authority == 1 &&
                        el.register == 4 &&
                        el.status == 1 &&
                        el.language == 'EN'
                      : el.authority == 1 &&
                        el.register == 4 &&
                        el.status == 1 &&
                        el.language == 'FI'

                  const taxAdminIndex = tradeRegister
                    ? tradeRegister.findIndex(taxAdmin)
                    : ''

                  // Prepayment register
                  const prePayment = (el) =>
                    lang === 'en'
                      ? el.authority == 1 &&
                        el.register == 5 &&
                        el.status == 1 &&
                        el.language == 'EN'
                      : el.authority == 1 &&
                        el.register == 5 &&
                        el.status == 1 &&
                        el.language == 'FI'

                  const prePaymentIndex = tradeRegister
                    ? tradeRegister.findIndex(prePayment)
                    : ''

                  // VAT
                  const VATliability = (el) =>
                    lang === 'en'
                      ? el.authority == 1 &&
                        el.register == 6 &&
                        el.status == 1 &&
                        el.language == 'EN'
                      : el.authority == 1 &&
                        el.register == 6 &&
                        el.status == 1 &&
                        el.language == 'FI'

                  const VATIndex = tradeRegister
                    ? tradeRegister.findIndex(VATliability)
                    : ''

                  // Employer register
                  const employerRegister = (el) =>
                    lang === 'en'
                      ? el.authority == 1 &&
                        el.register == 7 &&
                        el.status == 1 &&
                        el.language == 'EN'
                      : el.authority == 1 &&
                        el.register == 7 &&
                        el.status == 1 &&
                        el.language == 'FI'

                  const employerRegisterIndex = tradeRegister
                    ? tradeRegister.findIndex(employerRegister)
                    : ''

                  // businessLines
                  const businessLines = item.businessLines && item.businessLines
                  const businessLine = (el) =>
                    lang === 'en' ? el.language == 'EN' : el.language == 'FI'

                  const businessLineIndex = businessLines
                    ? businessLines.findIndex(businessLine)
                    : ''
                  // companyForms
                  const companyForms = item.companyForms && item.companyForms
                  const companyForm = (el) =>
                    lang === 'en' ? el.language == 'EN' : el.language == 'FI'

                  const companyFormIndex = companyForms
                    ? companyForms.findIndex(companyForm)
                    : ''

                  return (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {item.auxiliaryNames[0] && item.auxiliaryNames[0].name}
                      </TableCell>
                      <TableCell>{item.businessId}</TableCell>
                      <TableCell>{item.registrationDate}</TableCell>
                      <TableCell>
                        {businessLineIndex !== -1
                          ? item.businessLines[businessLineIndex] &&
                            item.businessLines[businessLineIndex].name
                          : ''}
                      </TableCell>
                      <TableCell>
                        {companyFormIndex !== -1
                          ? item.companyForms[companyFormIndex] &&
                            item.companyForms[companyFormIndex].name
                          : ''}
                      </TableCell>
                      <TableCell>
                        {URLind !== -1
                          ? item.contactDetails[URLind] &&
                            item.contactDetails[URLind].value
                          : ''}
                      </TableCell>
                      <TableCell>
                        {ind !== -1
                          ? item.contactDetails[ind] &&
                            '"\t' + item.contactDetails[ind].value
                          : ''}
                      </TableCell>

                      <TableCell>
                        {item.addresses[0]
                          ? item.addresses[0].street
                          : (item.addresses[2] && item.addresses[2].street) ||
                            (item.addresses[1] && item.addresses[1].street)}
                        <br />
                        {item.addresses[0]
                          ? item.addresses[0].city
                          : (item.addresses[2] && item.addresses[2].city) ||
                            (item.addresses[1] && item.addresses[1].city)}
                      </TableCell>
                      <TableCell>
                        {item.addresses[0]
                          ? '"\t' + item.addresses[0].postCode
                          : (item.addresses[2] &&
                              '"\t' + item.addresses[2].postCode) ||
                            (item.addresses[1] &&
                              '"\t' + item.addresses[1].postCode)}
                      </TableCell>
                      <TableCell>
                        {tradeRegIndex !== -1
                          ? item.registeredEntries[tradeRegIndex] &&
                            item.registeredEntries[tradeRegIndex].description
                          : ''}
                      </TableCell>
                      <TableCell>
                        {taxAdminIndex !== -1
                          ? item.registeredEntries[taxAdminIndex] &&
                            item.registeredEntries[taxAdminIndex].description
                          : ''}
                      </TableCell>
                      <TableCell>
                        {prePaymentIndex !== -1
                          ? item.registeredEntries[prePaymentIndex] &&
                            item.registeredEntries[prePaymentIndex].description
                          : ''}
                      </TableCell>
                      <TableCell>
                        {VATIndex !== -1
                          ? item.registeredEntries[VATIndex] &&
                            item.registeredEntries[VATIndex].description
                          : ''}
                      </TableCell>
                      <TableCell>
                        {employerRegisterIndex !== -1
                          ? item.registeredEntries[employerRegisterIndex] &&
                            item.registeredEntries[employerRegisterIndex]
                              .description
                          : ''}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      )}
    </>
  )
}

export default DownloadTableComponent
