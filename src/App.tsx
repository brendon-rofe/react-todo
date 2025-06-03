import {
  ChakraProvider,
  extendTheme,
  Container,
  Heading,
  Box,
  type ThemeConfig,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { CloseIcon } from "@chakra-ui/icons"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

function App() {
  const [todos, setTodos] = useState<string[]>(() => {
    const stored = localStorage.getItem("todos")
    return stored ? JSON.parse(stored) : []
  })
  const [input, setInput] = useState("")

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, input])
    setInput("")
  }

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.900" color="white" minH="100vh" py={10}>
        <Container>
          <Heading mb={6}>React Todo</Heading>

          <FormControl mb={4}>
            <FormLabel>Add Todo</FormLabel>
            <HStack>
              <Input
                placeholder="Enter a task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button colorScheme="teal" onClick={addTodo}>
                Add
              </Button>
            </HStack>
          </FormControl>

          <VStack align="stretch" spacing={3}>
            {todos.map((todo, i) => (
              <HStack key={i} justify="space-between" p={3} bg="gray.700" borderRadius="md">
                <Text>{todo}</Text>
                <IconButton
                  aria-label="Delete todo"
                  icon={<CloseIcon />}
                  size="sm"
                  onClick={() => removeTodo(i)}
                />
              </HStack>
            ))}
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
