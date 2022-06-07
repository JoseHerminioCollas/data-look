import React from 'react';
import { render, screen } from '@testing-library/react';
import DataLook from 'components/data-look';
import DataStyle from 'data-style';

test('renders learn react link', () => {
  const expected = 'xxx';
  const data = [{
    id: 'xx',
    name: expected,
  }];
  const dataStyle = DataStyle(data);
  render(<DataLook
    dataStyles={dataStyle.getAll()}
  />);
  const linkElement = screen.getByText(new RegExp(expected, 'i'));
  expect(linkElement).toBeInTheDocument();
});
