import React from 'react';
import { mergeStyles } from '@fluentui/react';

type ControlHeaderI = ({ children }: { children: React.ReactElement[] }) => React.ReactElement;
const controlAreaStyles = mergeStyles({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: '#ccc',
  opacity: '0.9',
  padding: '0.25em',
});

const ControlHeader: ControlHeaderI = ({ children }) => (
  <div className={controlAreaStyles}>
    {children}
  </div>
);

export default ControlHeader;
