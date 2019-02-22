import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import App, { Container } from 'next/app'
import NavMenu from '../components/NavMenu'
import Head from 'next/head'

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
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
        <NavMenu />
        <Component {...pageProps} />
      </Container>
    )
  }
}
