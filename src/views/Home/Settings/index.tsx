// libs
import React from 'react'
import Styled from 'styled-components/native'

export default () => {
  return (
    <Settings.Layout>
      <Settings.Title>Settings Component</Settings.Title>
    </Settings.Layout>
  )
}

const Settings = {
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
