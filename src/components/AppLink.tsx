import { StaticQuery, graphql, Link } from 'gatsby'
import React, { Fragment as F } from 'react'

interface AppLinkProps {
  appStoreURL: string
  locale: string
}

const AppLink: React.SFC<AppLinkProps> = ({ appStoreURL }) => {
  let getGuaranteedPathForLocale = (data: any, languages: any) => {
    var languageCodes = languages.map(language => language.slice(-2).toUpperCase())
    console.info(languageCodes)
    var paths = data.allFile.edges.map(edge => edge.node.relativePath)
    console.info(paths)
    var validLanguageCode = languageCodes.find(lang => {
      return paths.find(path => {
        if (languageCodes.find(lang => path.includes(lang))) {
          return true
        } else {
          return false
        }
      })
    })

    if (validLanguageCode) {
      return paths.find(path => path.includes(validLanguageCode))
    }
  }

  return (
    <StaticQuery
      query={AppStoreIconQuery}
      render={data => {
        let path = getGuaranteedPathForLocale(data, navigator.languages)
        return (
          <F>
            <h1>Something Special</h1>
            <img src={'assets/' + path} />
            <Link to={appStoreURL}> App </Link>
          </F>
        )
      }}
    />
  )
}

export const AppStoreIconQuery = graphql`
  {
    allFile(filter: { sourceInstanceName: { eq: "assets" }, extension: { eq: "svg" } }) {
      edges {
        node {
          id
          relativePath
        }
      }
    }
  }
`

export default AppLink
