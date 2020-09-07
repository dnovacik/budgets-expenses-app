// libs
import React from 'react'
import Styled from 'styled-components/native'

export default () => {
  return (
    <Dashboard.Layout>
      <Dashboard.Title>Dashboard Component</Dashboard.Title>
    </Dashboard.Layout>
  )
}

const Dashboard = {
  Layout: Styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  `,
  Title: Styled.Text`
    font-size: ${(props) => props.theme.font.size.medium};
  `,
}
