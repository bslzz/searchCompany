import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    textAlign: 'center'
  },

  form: {
    margin: 'auto',
    maxWidth: '700px',
    position: 'relative',
    padding: '30px'
  },

  searchInput: {
    padding: '10px',
    fontSize: '17px',
    border: '1px solid grey',
    width: '100%',
    background: '#f1f1f1'
  },
  searchBtn: {
    padding: '10px',
    background: '#2196f3',
    color: 'white',
    border: '1px solid grey',
    borderLeft: 'none'
  },

  resultTable: {
    padding: '30px 0'
  },
  searchLink: {
    float: 'right',
    marginTop: '5px',
    zIndex: 0,
    fontSize: '1.1rem'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  tableHead: {
    fontWeight: '600'
  },
  companyInfoIcons: {
    display: 'flex',
    alignItems: 'center'
  },
  infoIcon: {
    marginRight: '5px'
  },
  downloadBtn: {
    textAlignLast: 'right',
    marginBottom: '20px'
  }
}))
