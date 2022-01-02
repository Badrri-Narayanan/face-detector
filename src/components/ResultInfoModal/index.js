import React from 'react';

import './styles.css'

const ResultInfoModal = ({operationStatus, toggleModal}) => (
    <div style={{textAlign: 'center'}}>
        {
            operationStatus === 'success'
            ? <div className="operation-success">Updated Successfully!!</div>
            : <div className="operation-failed">Update Failed!</div>
        }
        <button
            onClick={() => toggleModal(false)} 
            className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
         >Okay</button>
    </div>
);

export default ResultInfoModal