'use client';
import { AiOutlineUp } from 'react-icons/ai';
import { IconButton } from '@chakra-ui/react';

const TopButton = () => {
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <IconButton colorScheme="gray" size="lg" shadow="md" rounded="full" icon={<AiOutlineUp />} onClick={returnTop} position="fixed" right="5" bottom="5" />
    </>
  );
};

export default TopButton;
