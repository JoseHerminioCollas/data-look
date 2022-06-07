import React from 'react';
import { mergeStyles } from '@fluentui/react';
import { DataStyles } from 'data-style';
import DataLookItem from 'components/data-look/data-look-item';

type DataLookI = (props: {
  dataStyles: DataStyles | Partial<DataStyles>,
  onClick?: (k: string) => void
  className: string
}) => React.ReactElement

const dataLookStyles = mergeStyles({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  cursor: 'pointer',
  height: 360,
  selectors: {
    '>div': {
      color: '#111',
      padding: '0.5em',
      transitionProperty: 'background',
      transitionDuration: '1s',
      margin: '0.25em',
      minWidth: '10em',
    },
    ' dl': {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      margin: 0,
      maxHeight: '500px',
      maxWidth: '500px',
      transitionProperty: 'max-height 3s',
      transitionDuration: '1s',
    },
    ' dl div': {
      display: 'flex',
      margin: '0.25em',
    },
    ' dl.hide-details': {
      maxHeight: 0,
      maxWidth: 0,
      overflow: 'hidden',
    },
    '.small': {
      fontSize: '1em',
    },
    '.large': {
      fontSize: '1.3em',
      margin: 0,
    },
    'dt::after ': {
      content: ' : ',
    },
    dd: {
      margin: '0 0.5em',
    },
  },
});
const DataLook: DataLookI = ({
  dataStyles,
  onClick = () => undefined,
  className,
}) => (
  <div className={[dataLookStyles, className].join(' ')}>
    {
      Object.entries(dataStyles).map(([k, v]) => {
        if (!v) return null
        const { id, name, ...details } = v.data;

        return (
          <div
            role="button"
            tabIndex={0}
            key={k}
            style={{
              background: v.background,
            }}
            onClick={() => onClick(k)}
            onKeyDown={() => onClick(k)}
          >
            <h3 className={v.showDetails ? 'small' : 'large'}>
              {name}
              {' '}
              <br />
              <span style={{ fontSize: '0.7em' }}>{details.quote}</span>
            </h3>
            <DataLookItem
              data={details}
              show={v.showDetails}
            />
          </div>
        );
      })
    }
  </div>
);

export default DataLook;
