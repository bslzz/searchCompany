import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CompanyListsModel from '../../utils/companyListsModel'
import {
  closeCompanyLists,
  searchCompany
} from '../../redux/searchCompanySlice'
import SearchIcon from '@material-ui/icons/Search'
import { useStyles } from './companyName.style'
import { Link } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
import clsx from 'clsx'
import AdvanceSearch from '../advancedSearch/advancedSearch'
import CompanyInfoTable from '../companyInfoTable/companyInfoTable'
import DownloadTableComponent from '../downloadToExcelTable/toExcelTable'
import XLSX from 'xlsx'
import { useTranslation } from 'react-i18next'
import LanguageComponent from '../language/changeLangComponent'

const CompanyNameSearch = () => {
  const { t } = useTranslation('searchContainer')
  const [expanded, setExpanded] = React.useState(false)

  const companyLists = useSelector((state) => state.companyList.companies)
  const apiSuccess = useSelector((state) => state.companyList.apiSuccess)

  const dispatch = useDispatch()
  const classes = useStyles()

  const searchHandler = (e) => {
    e.target.value.length > 1
      ? dispatch(searchCompany(e.target.value))
      : dispatch(closeCompanyLists())
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  //Download excel
  const btnRef = useRef(null)
  const clickExcel = () => {
    var workbook = XLSX.utils.book_new()

    var worksheet = XLSX.utils.table_to_sheet(btnRef.current)

    worksheet['!cols'] = [
      { wpx: 180 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 150 },
      { wpx: 100 },
      { wpx: 180 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 180 },
      { wpx: 100 }
    ]

    workbook.SheetNames.push('companyInfo')
    workbook.Sheets['companyInfo'] = worksheet

    exportExcelFile(workbook)
  }

  const exportExcelFile = (workbook) => {
    return XLSX.writeFile(workbook, 'companyInfo.xlsx')
  }

  return (
    <>
      <div className={classes.root}>
        <LanguageComponent />
        <h1 className={classes.heading}>{t('Company Search')}</h1>
        <div className={classes.form}>
          <div style={{ display: 'flex', position: 'relative' }}>
            <input
              placeholder={t('Company Name')}
              type='text'
              name='companySearch'
              onChange={searchHandler}
              autoComplete='off'
              className={classes.searchInput}
            />
            <button
              type='submit'
              onSubmit={fetch}
              className={classes.searchBtn}
            >
              <SearchIcon />
            </button>
          </div>

          <div>
            {apiSuccess && (
              <CompanyListsModel
                classes={classes}
                companyLists={companyLists}
                closeCompanyLists={closeCompanyLists}
              />
            )}
          </div>
          <div className={classes.searchLink}>
            <Link
              to='#'
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show more'
            >
              {t('Advanced Search')}
            </Link>
          </div>
        </div>
        <div className={classes.advancedSearchCollapse}>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <AdvanceSearch />
          </Collapse>
        </div>
      </div>

      <CompanyInfoTable classes={classes} clickExcel={clickExcel} />
      <DownloadTableComponent btnRef={btnRef} />
    </>
  )
}

export default CompanyNameSearch
