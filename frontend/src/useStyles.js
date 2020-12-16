import { makeStyles, createMuiTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '960px !important',
  },
  authFormBox: {
    marginTop: '8px !important',
    marginBottom: '8px !important',
  },
  authFormBoxButton: {
    marginTop: '16px !important',
    marginBottom: '8px !important',
  },
  splashScreenBg: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.secondary.main,
  },
  splashScreenProgress: {
    position: 'fixed',
    top: 'calc(50% - 110px)',
    left: 'calc(50% - 110px)',
    width: '220px !important',
    height: '220px !important',
    zIndex: 1,
  },
  splashScreenLogo: {
    position: 'fixed',
    top: 'calc(50% - 125px)',
    left: 'calc(50% - 125px)',
    width: '250px',
    height: '250px',
  },
  appBar: {
    justifyContent: 'center',
    height: '70px',
  },
  appBarTitle: {
    marginLeft: theme.spacing(1),
  },
  appBarLogo: {
    marginLeft: theme.spacing(2),
    width: '3em',
    height: '3em',
  },
  mainPaper: {
    height: '100vh',
  },
  tabs: {
    display: 'flex',
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  tab: {
    height: 70,
  },
  tabBtnLabel: {
    width: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutBtn: {
    width: 90,
    position: 'absolute !important',
    right: 25,
  },
  dialogBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  feed: {
    height: 'calc(100vh - 70px)',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.1)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '0.3em',
    },
  },
  starterWrapper: {
    height: 'calc(100vh - 70px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    overflow: 'hidden',
  },
  starterIcon: {
    width: 250,
    height: 250,
  },
  starterCaption: {
    marginTop: '64px !important',
    marginBottom: '32px !important',
  },
  starterButton: {
    border: '2px solid rgba(124, 161, 255, 0.6) !important',
    backgroundColor: 'white !important',
    borderRadius: 6,
    '&:hover': {
      border: '2px solid rgba(124, 161, 255, 0.85) !important',
    },
  },
  formCretePoll: {
    width: 200,
    marginTop: '16px !important',
  },
  contentCretePoll: {
    display: 'flex !important',
    flexDirection: 'row !important',
    alignItems: 'flex-end !important',
    marginBottom: '16px !important',
  },
  dailogSgmnt: {
    marginLeft: theme.spacing(3),
  },
  countDown: {
    fontSize: '5em',
    color: theme.palette.secondary.main,
    fontWeight: 500,
  },
  fab: {
    position: 'absolute !important',
    bottom: '25px !important',
    left: '15px !important',
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  },
  suggPaper: {
    maxHeight: '260px',
    overflowY: 'auto',
    textOverflow: 'ellipsis !important',
    '&::-webkit-scrollbar': {
      width: '0.3em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 3px rgba(0,0,0,0.1)',
      webkitBoxShadow: 'inset 0 0 3px rgba(0,0,0,0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#e7b7c9',
      borderRadius: '0.15em',
    },
  },
  autoComplete: {
    width: '240px'
  },

  '@media screen and (max-width: 600px)': {
    container: {
      paddingLeft: '0px !important',
      paddingRight: '0px !important',
    },
    starterIcon: {
      width: 200,
      height: 200,
    },
    starterWrapper: {
      paddingTop: '40px !important',
    },
    starterCaption: {
      marginTop: '24px !important',
      marginBottom: '32px !important',
      fontSize: '1.8rem !important',
    },
    contentCretePoll: {
      alignItems: 'center !important',
    },
    autoComplete: {
      width: '200px'
    },
  },
}))

export const theme = createMuiTheme(require('theme.json'))
