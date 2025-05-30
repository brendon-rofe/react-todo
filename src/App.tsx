import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react"


function App() {

  return (
    <ChakraProvider value={defaultSystem}>
      <h1>Hello world</h1>
    </ChakraProvider>   
  )

}

export default App
