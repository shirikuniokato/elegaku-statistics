'use client';

// Chakra UI関連
import { Input, FormControl, FormLabel } from '@chakra-ui/react';

import Title from '../../common/item-title';

const MonthList = (props) => {
  const change = (e) => {
    props.setYm(e.target.value);
  };

  return (
    <>
      <FormControl>
        <FormLabel>
          <Title title="対象年月" />
        </FormLabel>
        <Input placeholder="対象年月を設定してください" size="md" type="month" defaultValue={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`} onChange={change} />
      </FormControl>
    </>
  );
};

export default MonthList;
