import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import App, { Container } from 'next/app'
import NavMenu from '../components/NavMenu'

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <NavMenu />
        <Component {...pageProps} />
      </Container>
    )
  }
}
