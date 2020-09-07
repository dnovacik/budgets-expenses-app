// libs
import React from 'react'
import Styled from 'styled-components/native'

// components
import Router from '../../navigation'

export default () => {
  return (
    <App.Layout>
      <App.Body>
        <Router />
      </App.Body>
    </App.Layout>
  )
}

const App = {
  Layout: Styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.light['shade-1']};
  `,
  Body: Styled.View`
    flex: 1;
  `,
}
