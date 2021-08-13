import { ChakraProvider } from '@chakra-ui/react'

const ChakraWrapper = (props: {
  children: JSX.Element
}) => {
  return (
    <ChakraProvider>{props.children}</ChakraProvider>
  )
}

export default ChakraWrapper
