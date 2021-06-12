import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    maxWidth: '700px',
    margin: 'auto'
  },
  heading: {
    textAlign: 'center'
  },
  searchBtnDiv: {
    textAlign: 'center',
    padding: '10px 0'
  },
  searchBtn: {
    width: '20%',
    background: '#88b397',
    color: '#fff',
    opacity: 0.9,
    '&:hover': {
      background: '#88b397',
      opacity: 1
    }
  }
}))
