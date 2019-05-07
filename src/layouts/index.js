import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Chrome from '../components/Chrome'
import Header from '../components/Header'
import './index.css'
import { convertToDirTree } from '../utils/helpers'

export default ({ children, data }) => {
  const treeData = data.allMarkdownRemark.edges.map(({ node }) => (
    node.fileAbsolutePath.split("src/docs")[1]
  ));
  const tree = convertToDirTree(treeData);
  return (
    <Chrome header={<Header />} tree={tree}>
      <Helmet
        title="Paramount WorkPlace Docs"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      {children()}
    </Chrome>
  )
}

export const pageQuery = graphql`
  query Docs {
    allMarkdownRemark {
       totalCount
       edges {
         node {
           id
           frontmatter {
             path
             title
           }
           fileAbsolutePath
         }
       }
     }
   }
`