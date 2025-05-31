import { ChakraProvider, extendTheme, Container, Heading, Box, type ThemeConfig, FormControl, FormLabel } from "@chakra-ui/react";

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
          <FormControl>
            <FormLabel>Add Todo</FormLabel>
          </FormControl>
        </Container>
      </Box>
    </ChakraProvider>   
  )

}

export default App
