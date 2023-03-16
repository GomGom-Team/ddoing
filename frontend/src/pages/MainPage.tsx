import React from 'react'
import 'twin.macro'
import { Container, Button, Logo } from '../components/common/index'
import tw from 'twin.macro'

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }: { hasBackground: boolean }) => [
    tw`flex flex-col items-center justify-center h-screen`,
    hasBackground && tw`bg-gradient-to-b from-electric to-ribbon`,
    
  ],
}

const Sample = () => {
  return(
    // imported css
    <div css={styles.container({ hasBackground: true })}>
      {/* inline css */}
      <div tw="flex flex-col justify-center h-full gap-y-5">
        {/* atomic */}
        <Button variant="primary">Submit</Button>
        <Button variant="secondary">Cancel</Button>
        <Button isSmall>Close</Button>
      </div>
      <Logo />
    </div>
  )
}

const MainPage = () => {
  return (
    <div>
      <h1>Hi</h1>
    </div>
  )
}

export default MainPage