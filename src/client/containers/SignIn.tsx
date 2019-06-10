import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, FormHelperText, Container, Typography, TextField, Box, Link, CssBaseline, Button } from '@material-ui/core'
import { fetchAuth } from '../redux/actions/auth'
import { authSucceed, authError, isAuthFetching } from '../redux/reducers/auth'
import { ActionError } from '../interfaces'

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
  fetchAuth: () => any,
  authSucceed: boolean,
  authError: ActionError,
  isAuthFetching: boolean
}

const SignIn: FunctionComponent<SignInProps> = ({ fetchAuth, authError }) => {
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
                      error={!!authError}
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
                        error={!!authError}
                        variant='outlined'
                        label='password'
                        margin='normal'
                        fullWidth={true}
                        type='password'
                      />
                  )}
                />

                {authError &&
                <FormControl error={true}>
                  <FormHelperText>{authError.message}</FormHelperText>
                </FormControl>
                }
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
    authSucceed: authSucceed(state),
    authError: authError(state),
    isAuthFetching: isAuthFetching(state)
  }
}

const mapDispatchToProps = {
  fetchAuth
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
