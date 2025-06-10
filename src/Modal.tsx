import { CloseIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  HStack,
  Spacer,
  IconButton,
  Input,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

type Todo = {
  text: string;
  done: boolean;
  dueDate?: string; // ISO date string
};

function ModalComponent() {

  const [todos, setTodos] = useState<Todo[]>(() => {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editText, setEditText] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

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

  return (
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
  )

}

export default ModalComponent;
