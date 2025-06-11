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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editText: string;
  setEditText: (text: string) => void;
  editDueDate: string;
  setEditDueDate: (date: string) => void;
  onSave: () => void;
};

function EditModal({
  isOpen,
  onClose,
  editText,
  setEditText,
  editDueDate,
  setEditDueDate,
  onSave,
}: EditModalProps) {
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
                  if (e.key === "Enter") onSave();
                  if (e.key === "Escape") onClose();
                }}
              />
              <Input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
              <Button colorScheme="teal" onClick={onSave}>
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
  );
}

export default EditModal;
