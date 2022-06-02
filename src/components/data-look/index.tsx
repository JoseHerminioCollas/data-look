import React from "react";
import { DataStyles } from 'data-style'

type DataLookI = (props: { dataStyles: DataStyles }) => React.ReactElement

const DataLook: DataLookI = ({ dataStyles }) => {
    return (<div className='view-container'>
        {
            Object.entries(dataStyles).map(([k, v]) => (
                <div
                    key={k}
                    style={{
                        background: v.background
                    }}
                >
                    {v.data.name}
                </div>
            ))
        }
    </div>)
}

export default DataLook;
