// libs
import React from 'react'
import Styled from 'styled-components/native'

export default () => {
  return (
    <Home.Layout>
      <Home.Title>Home Component</Home.Title>
    </Home.Layout>
  )
}

const Home = {
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
