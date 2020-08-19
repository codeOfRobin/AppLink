import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import { Container } from '../components/Container'
import AppLink from '../components/AppLink'
import IndexLayout from '../layouts'

const IndexPage = () => {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
        </Container>
        <AppLink appStoreURL="https://google.com" />
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
