import { ChakraProvider, extendTheme, Container, Heading, Box, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.900" color="white" minH="100vh" py={10}>
        <Container>
          <Heading>React Todo</Heading>
        </Container>
      </Box>
    </ChakraProvider>   
  )

}

export default App
