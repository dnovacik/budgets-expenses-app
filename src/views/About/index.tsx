// libs
import React from 'react'
import Styled from 'styled-components/native'

export default () => {
  return (
    <About.Layout>
      <About.Title>About Component</About.Title>
    </About.Layout>
  )
}

const About = {
  Layout: Styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Title: Styled.Text`
    font-size: ${(props) => props.theme.font.size.medium};
  `,
}
