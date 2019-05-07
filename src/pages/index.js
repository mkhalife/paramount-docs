import React, { Component } from 'react'
import mixpanel from 'mixpanel-browser' // import the mixpanel lib
import Link from 'gatsby-link'
import styled from 'styled-components'


const CardContainer = styled.div`
  display: flex;
  margin: 32px 0;
  justify-content: space-around;
`

const Card = styled(Link)`
  display: inline-block;
  border-radius: 4px;
  padding: 20px 40px;
  width: 250px;
  background-color: #aaa;
  color: #fff !important;
  text-align: center;
`

class IndexPage extends Component {

  // Init and send the Mixpanel event
  componentDidMount() {
    if (process.env.GATSBY_MIXPANEL_KEY) {
      mixpanel.init(process.env.GATSBY_MIXPANEL_KEY)
      mixpanel.track("docs.view:homepage")
    }
  }

  render() {
    return (
      <div>
        <h1>Documentation</h1>
        <p>Welcome to Paramount WorkPlace! Here you'll find articles to help you get started, manage your system, and more!</p>
        <CardContainer>
          <Card to="/quickstart/getting-started">
            Getting started
          </Card>
          <Card to="/about">
            About us
          </Card>
        </CardContainer>
      </div>
    )
  }
}

export default IndexPage
