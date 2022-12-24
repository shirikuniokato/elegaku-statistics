'use client';

// Chakra UI関連
import { Input, FormControl, FormLabel } from '@chakra-ui/react';

const MonthList = () => {
  const date = new Date();
  const defaultYearMonth = date.getFullYear() + '-' + (date.getMonth() + 1);

  return (
    <>
      <FormControl>
        <FormLabel>対象年月</FormLabel>
        <Input placeholder="対象年月を設定してください" size="md" type="month" defaultValue={defaultYearMonth} />
      </FormControl>
    </>
  );
};

export default MonthList;
