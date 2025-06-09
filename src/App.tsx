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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Spacer,
  Badge,
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
  dueDate?: string; // ISO date string
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, done: false, dueDate }]);
    setInput("");
    setDueDate("");
  };

  const removeTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTodo = (index: number) => {
    setTodos((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
    );
  };

  const updateTodoText = () => {
    if (editingIndex !== null && editText.trim()) {
      setTodos((prev) =>
        prev.map((t, i) =>
          i === editingIndex ? { ...t, text: editText, dueDate: editDueDate } : t
        )
      );
    }
    onClose();
    setEditingIndex(null);
    setEditText("");
    setEditDueDate("");
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditText(todos[index].text);
    setEditDueDate(todos[index].dueDate || "");
    onOpen();
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
    startEditing,
  }: {
    todo: Todo;
    index: number;
    toggleTodo: (index: number) => void;
    removeTodo: (index: number) => void;
    startEditing: (index: number) => void;
  }) {
    const isOverdue =
      todo.dueDate && !todo.done && new Date(todo.dueDate) < new Date();

    return (
      <HStack
        justify="space-between"
        p={3}
        bg={todo.done ? "green.700" : "gray.700"}
        borderRadius="md"
      >
        <VStack align="start" spacing={1}>
          <HStack spacing={3}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(index)}
              style={{ transform: "scale(1.5)" }}
            />
            <Text as={todo.done ? "s" : undefined}>{todo.text}</Text>
          </HStack>
          {todo.dueDate && (
            <HStack>
              <Text fontSize="sm" color="gray.300">
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </Text>
              {isOverdue && (
                <Badge colorScheme="red" fontSize="xs">
                  Overdue
                </Badge>
              )}
            </HStack>
          )}
        </VStack>

        <HStack spacing={2}>
          <Button size="sm" onClick={() => startEditing(index)}>
            Edit
          </Button>
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
            <VStack align="stretch">
              <Input
                placeholder="Enter a task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <Button colorScheme="teal" onClick={addTodo}>
                Add
              </Button>
            </VStack>
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
                    startEditing={startEditing}
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
                    startEditing={startEditing}
                  />
                ))}
              </>
            )}
          </VStack>
        </Container>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="gray.800" color="white" p={4}>
            <ModalBody>
              <VStack align="stretch" spacing={4}>
                <HStack>
                  <Text fontSize="lg" fontWeight="bold">
                    Edit Todo
                  </Text>
                  <Spacer />
                  <IconButton
                    aria-label="Close modal"
                    icon={<CloseIcon />}
                    size="sm"
                    variant="ghost"
                    color="white"
                    _hover={{ bg: "gray.700" }}
                    onClick={onClose}
                  />
                </HStack>
                <HStack>
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") updateTodoText();
                      if (e.key === "Escape") onClose();
                    }}
                  />
                  <Input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                  />
                  <Button colorScheme="teal" onClick={updateTodoText}>
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    color="white"
                    _hover={{ bg: "gray.700" }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}

export default App;
