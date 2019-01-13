import { StaticQuery, graphql } from "gatsby"
import React, { Fragment as F } from 'react'

interface AppLinkProps {
  appStoreURL: string
  locale: string
}

const AppLink: React.SFC<AppLinkProps> = ({ appStoreURL }) => {
  let browserLanguage = navigator.language
  let folderLanguage = browserLanguage.slice(-2)
  let getPathForLocale = (data: any, locale: any) => {
    return data.allFile.edges.find((path: any) => path.node.relativePath.includes(locale));
  }

  let getGuaranteedPathForLocale = (data: any, locale: any) => {
    let edge = getPathForLocale(data, locale)
    if (edge) {
      return edge.node.relativePath;
    }
    return getPathForLocale(data, "US").node.relativePath
  }
  return (
    <StaticQuery
      query={AppStoreIconQuery}
      render={data => {
        let path = getGuaranteedPathForLocale(data, folderLanguage)
        console.log(data)
        return (
          <F>
            <h1>Something Special</h1>
            <img src={"assets/" + path} />
          </F>
        )
      }}
    />
  )
}


export const AppStoreIconQuery = graphql`
{
  allFile(filter: {sourceInstanceName: {eq: "assets" }, extension:{eq: "svg"}  }) {
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
