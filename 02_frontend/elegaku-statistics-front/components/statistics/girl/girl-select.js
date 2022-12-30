'use client';

import React from 'react';
import { Select, FormControl, FormLabel } from '@chakra-ui/react';
import Title from '../../common/item-title';

const GirlList = (props) => {
  const change = (e) => {
    props.setId(e.target.value);
  };

  return (
    <>
      <FormControl>
        <FormLabel>
          <Title title="生徒" />
        </FormLabel>
        {props.girls.length == 0 ? (
          <p>データがありません</p>
        ) : (
          <Select placeholder="選択してください" onChange={change}>
            {craeteOptions(props.girls)}
          </Select>
        )}
      </FormControl>
    </>
  );
};

const craeteOptions = (data) => {
  const result = [];
  data
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .forEach((item) => {
      result.push(
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
  return result;
};

export default GirlList;
