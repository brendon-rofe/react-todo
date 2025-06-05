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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CloseIcon } from "@chakra-ui/icons";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

type Todo = {
  text: string;
  done: boolean;
};

function App() {
  function TodoItem({ todo, index }: { todo: Todo; index: number }) {
    return (
      <HStack
        justify="space-between"
        p={3}
        bg={todo.done ? "green.700" : "gray.700"}
        borderRadius="md"
      >
        <HStack spacing={3}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() =>
              setTodos((prev) =>
                prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
              )
            }
            style={{ transform: "scale(1.5)" }}
          />
          <Text as={todo.done ? "s" : undefined}>{todo.text}</Text>
        </HStack>
        <IconButton
          aria-label="Delete todo"
          icon={<CloseIcon />}
          size="sm"
          onClick={() => setTodos((prev) => prev.filter((_, i) => i !== index))}
        />
      </HStack>
    );
  }

  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, done: false }]);
    setInput("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const activeTodos = todos.filter((t) => !t.done);
  const completedTodos = todos.filter((t) => t.done);

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
            {activeTodos.length > 0 && (
              <>
                <Heading size="md" mb={2}>
                  Active
                </Heading>
                {activeTodos.map((todo, i) => (
                  <TodoItem
                    key={`active-${i}`}
                    todo={todo}
                    index={todos.indexOf(todo)}
                  />
                ))}
              </>
            )}

            {completedTodos.length > 0 && (
              <>
                <Heading size="md" mt={6} mb={2}>
                  Completed
                </Heading>
                {completedTodos.map((todo, i) => (
                  <TodoItem
                    key={`done-${i}`}
                    todo={todo}
                    index={todos.indexOf(todo)}
                  />
                ))}
              </>
            )}
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
