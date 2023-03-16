import React from 'react'
import tw from 'twin.macro'
import { Container, Button, Logo } from './components/common'
import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }: { hasBackground: boolean }) => [
    tw`flex flex-col items-center justify-center h-screen`,
    hasBackground && tw`bg-gradient-to-b from-electric to-ribbon`,
    
  ],
}

const App = () => (
  <Container isOverflowed>
    <div css={styles.container({ hasBackground: true })}>
      <div tw="flex flex-col justify-center h-full gap-y-5">
        <Button variant="primary">Submit</Button>
        <Button variant="secondary">Cancel</Button>
        <Button isSmall>Close</Button>
      </div>
      <Logo />
    </div>
    <RouterProvider router={router} />
  </Container>
)

export default App