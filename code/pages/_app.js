import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import App, { Container } from 'next/app'
import NavMenu from '../components/NavMenu'
import Head from 'next/head'
import '../config/configFontAwesome'
import { extractJwtFromCookie,
  redirectToLogin,
  isLoginPage
} from '../utils/authentication'

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const jwtToken = extractJwtFromCookie('token', ctx.req)

    if (!isLoginPage(ctx.pathname) && !jwtToken) {
      redirectToLogin(ctx.res)
      return {}
    }

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx, jwtToken)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
        <NavMenu />
        <Component {...pageProps} />
      </Container>
    )
  }
}
