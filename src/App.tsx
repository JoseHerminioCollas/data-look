import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FontIcon,
  Modal,
  Toggle, mergeStyles,
} from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import DataStyle, { DataStyles } from 'data-style';
import DataLook from 'components/data-look';
import ControlHeader from 'components/control-header';
import PopUpSelect from 'components/pop-up-select';
import convertFromCMC from 'convert-from-cmc';
import dataA from 'data-c';
import convertStringKey from 'convert-string-key';

const modes = { local: 'LOCAL', wire: 'WIRE' };
const mode = modes.local;
const dataLookStyles = mergeStyles({
  fontSize: '0.8em',
  selectors: {
    ' > div': {
      margin: '1px',
      color: '#333',
      padding: '0.3em',
      dl: {
        fontSize: '0.8em',
        color: '#333',
      },
    },
  },
});
const headerStyles = mergeStyles(
  {
    display: 'flex',
    alignItems: 'center',
  },
);
const controlStyle = mergeStyles({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0px 3em',
  padding: '0.25em',
  selectors: {
    h3: {
      display: 'inline',
      padding: '0.25em',
    },
    select: {
      fontSize: '1.4em',
      margin: '1em',
      borderRadius: '0.5em',
      padding: '0.1em',
      color: '#222',
    },
  },
});
const toggleStyles = {
  root: {
    margin: '0 30px 20px 0',
    maxWidth: '300px',
  },
};
const modalClass = mergeStyles({
  textAlign: 'center',
  background: '#eee',
  borderRadius: '1em',
  margin: '0 0.35em',
  padding: '0.5em',
  maxWidth: 500,
  maxHeight: 600,
});
const infoIconClass = mergeStyles({
  fontSize: 25,
  fontWeight: 900,
  height: 25,
  width: 25,
  margin: '0 0.35em',
  cursor: 'pointer',
});
const cancelIconClass = mergeStyles({
  fontSize: 25,
  fontWeight: 900,
  height: 25,
  margin: '0.5em 0.35em',
  cursor: 'pointer',
});
const lastUpdateStyle = mergeStyles({
  fontSize: '0.7em',
  selectors: {
    span: {
      fontWeight: 900,
    },
    p: {
      margin: '0.2em',
    },
  },
});
const modalHeaderStyle = mergeStyles({
  background: '#ccc',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 0 1.5em 0',
  padding: '0 0.5em',
  borderRadius: '0.5em',
});
const dataB = convertStringKey(dataA);

function App() {
  initializeIcons();
  const dataStyle = DataStyle(dataB);
  // preserve dataStyle in state
  const [dataStyleState] = useState(dataStyle);
  const [data, setData] = useState<DataStyles | Partial<DataStyles>>(dataStyle.getAll());
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [showDetails, setShowdetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dataStyle.listenItems((v) => {
      if (!v) return;
      setData(v);
    });
    if (mode === modes.wire) {
      axios.get('http://localhost:3030/info')
        .then((res) => {
          const a = convertFromCMC(res.data.data);
          dataStyle.setAll(a);
          // set initial values of UI
          const value = Object.values(dataStyle.getAll())[0];
          if (value) {
            setSelectedItem(value.id);
          }
        });
    }
  }, []);
  useEffect(() => {
    const item = dataStyleState.get(selectedItem);
    if (item && selectedItem === item.id) {
      setShowdetails(item.showDetails);
    }
  }, [data, dataStyleState]);
  const onSelectChange = (id: string) => {
    setSelectedItem(id);
    const item = dataStyleState.get(id);
    if (item) {
      setShowdetails(item.showDetails);
    }
  };
  const onToggleChange = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    if (!selectedItem || checked === undefined) return;
    setShowdetails(checked);
    dataStyleState.setId(selectedItem, { showDetails: checked });
  };

  return (
    <div>
      <DataLook
        className={dataLookStyles}
        onClick={dataStyleState.toggle}
        dataStyles={data}
      />
      <ControlHeader>
        <h3 className={headerStyles}>
          DataLook
          <FontIcon
            onClick={() => setIsModalOpen(true)}
            aria-label="Information"
            iconName="info"
            className={infoIconClass}
          />
        </h3>
        <div className={controlStyle}>
          <div className={lastUpdateStyle}>
            <article>
              <h3>Meteorite Landings</h3>
              <p>This comprehensive data set from The Meteoritical Society contains</p>
              <p>information on all of the known meteorite landings.</p>
              &nbsp;
              <a href="https://data.nasa.gov">https://data.nasa.gov</a>
            </article>
          </div>
          <PopUpSelect
            entries={data}
            onChange={onSelectChange}
            className="selectorStyles"
            val={selectedItem}
          />
          <Toggle
            styles={toggleStyles}
            checked={showDetails}
            label="Show Details"
            defaultChecked
            onText="On"
            offText="Off"
            onChange={onToggleChange}
          />
        </div>
      </ControlHeader>
      <Modal
        titleAriaId="Goatstone Information"
        onDismiss={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        isBlocking={false}
        containerClassName={modalClass}
      >
        <article>
          <div className={modalHeaderStyle}>
            DataLook
            <FontIcon
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Window"
              iconName="cancel"
              className={cancelIconClass}
            />
          </div>
          <article>
            <img src="/logo.svg" alt="logo" width="200" />
            <p>
              Patterns in JavaScript for the display of data
            </p>
            Git Hub :&nbsp;
            <a href="https://github.com/JoseHerminioCollas/data-view">
              https://github.com/JoseHerminioCollas/data-view
            </a>
          </article>
        </article>
      </Modal>
    </div>
  );
}

export default App;
