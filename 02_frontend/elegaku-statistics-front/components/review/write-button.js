'use client';
import { AiOutlineForm } from 'react-icons/ai';
import { IconButton } from '@chakra-ui/react';

const WriteButton = (props) => {
  return (
    <>
      <IconButton colorScheme="teal" size="lg" shadow="md" rounded="full" icon={<AiOutlineForm />} onClick={props.onOpen} position="fixed" right="5" bottom="calc(env(safe-area-inset-bottom) + 130px)" />
    </>
  );
};

export default WriteButton;
