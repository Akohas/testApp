import React, { FunctionComponent } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import { fetchAuth } from '../redux/actions/auth'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

type SignInProps = {
  fetchAuth: () => any
}

const SignIn: FunctionComponent<SignInProps> = ({ fetchAuth }) => {
  const classes = useStyles()
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box alignItems='center' flexDirection='column' className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Form
          onSubmit={fetchAuth}
          render={({ handleSubmit, form }) => (
            <form className={classes.form} onSubmit={handleSubmit} noValidate={true}>
                <Field
                  name='username'
                  render={({ input, meta }) => (
                      <TextField
                        {...input}
                        variant='outlined'
                        label='username'
                        margin='normal'
                        fullWidth={true}
                        type='text'
                      />
                  )}
                />
                <Field
                  name='password'
                  render={({ input, meta }) => (
                      <TextField
                        {...input}
                        variant='outlined'
                        label='password'
                        margin='normal'
                        fullWidth={true}
                        type='password'
                      />
                  )}
                />
              <Button
                type='submit'
                fullWidth={true}
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Sign In
              </Button>
              <Link href='#' variant='body2'>
                Don't have an account? Sign Up
              </Link>
            </form>
          )}
        />
      </Box>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = {
  fetchAuth
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
