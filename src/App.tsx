import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FontIcon,
  // IIconProps,
  // DatePicker,
  // defaultDatePickerStrings,
  IconButton,
  // Dropdown,
  // IDropdownStyles,
  Modal,
  Toggle, mergeStyles,
} from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import DataStyle, { DataStyles, Datum } from 'data-style';
import DataLook from 'components/data-look';
import ControlHeader from 'components/control-header';
import PopUpSelect from 'components/pop-up-select';
import lineData from 'data-b';
import convertFromCMC from 'convert-from-cmc';

const modes = { local: 'LOCAL', wire: 'WIRE' };
const mode = modes.wire;
const dataLookStyles = mergeStyles({
  selectors: {
    ' > div': {
      color: '#333',
    },
  },
});
const headerStyles = mergeStyles(
  {
    margin: '0 2em',
  },
);
const toggleStyles = {
  root: {
    margin: '0 30px 20px 0',
    maxWidth: '300px',
  },
};
const modalClass = mergeStyles({
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
  selectors: {
    article: {
      background: 'red',
    },
  },
});
const lineDatum: Datum[] = convertFromCMC(lineData.data);

function App() {
  initializeIcons();

  const dataStyle = DataStyle([]);
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
    if (mode === modes.local) {
      setTimeout(() => {
        dataStyle.setAll(lineDatum);
      }, 1000);
    } else {
      axios.get('http://localhost:3030/info')
        .then((res) => {
          const a = convertFromCMC(res.data.data);
          dataStyle.setAll(a);
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
        <h3 className={headerStyles}>DataLook</h3>
        <PopUpSelect
          entries={data}
          onChange={onSelectChange}
          className="selectorStyles"
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
        <FontIcon
          onClick={() => setIsModalOpen(true)}
          aria-label="Information"
          iconName="info"
          className={infoIconClass}
        />
      </ControlHeader>
      <Modal
        titleAriaId="Goatstone Information"
        onDismiss={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        isBlocking={false}
        containerClassName={modalClass}
      >
        <article>
          <div className="modal-header">
            DataLook
            <FontIcon
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Window"
              iconName="cancel"
              className={cancelIconClass}
            />
          </div>
          <article>
            <p>
              Viewing Data
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
