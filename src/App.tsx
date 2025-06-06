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

  const removeTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTodo = (index: number) => {
    setTodos((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
    );
  };

  const updateTodoText = (index: number, newText: string) => {
    setTodos((prev) =>
      prev.map((t, i) => (i === index ? { ...t, text: newText } : t))
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const activeTodos = todos.filter((t) => !t.done);
  const completedTodos = todos.filter((t) => t.done);

  function TodoItem({
    todo,
    index,
    toggleTodo,
    removeTodo,
    updateTodoText,
  }: {
    todo: Todo;
    index: number;
    toggleTodo: (index: number) => void;
    removeTodo: (index: number) => void;
    updateTodoText: (index: number, newText: string) => void;
  }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(todo.text);

    const handleSave = () => {
      if (tempText.trim()) {
        updateTodoText(index, tempText);
        setIsEditing(false);
      }
    };

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
            onChange={() => toggleTodo(index)}
            style={{ transform: "scale(1.5)" }}
          />

          {isEditing ? (
            <Input
              size="sm"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") setIsEditing(false);
              }}
            />
          ) : (
            <Text
              as={todo.done ? "s" : undefined}
              onDoubleClick={() => setIsEditing(true)}
              cursor="pointer"
            >
              {todo.text}
            </Text>
          )}
        </HStack>

        <HStack spacing={2}>
          {isEditing ? (
            <>
              <Button size="sm" colorScheme="teal" onClick={handleSave}>
                Save
              </Button>
              <Button size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}

          <IconButton
            aria-label="Delete todo"
            icon={<CloseIcon />}
            size="sm"
            onClick={() => removeTodo(index)}
          />
        </HStack>
      </HStack>
    );
  }

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
                    toggleTodo={toggleTodo}
                    removeTodo={removeTodo}
                    updateTodoText={updateTodoText}
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
                    toggleTodo={toggleTodo}
                    removeTodo={removeTodo}
                    updateTodoText={updateTodoText}
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
