import React from 'react'

export default function BtnAddToLib(props) {


    return (
        <span className="add-button mx-2" onClick={()=> props.addTrackToLib()}>
            {props.trackInLibrary ? (<i className="fas fa-check"></i>)
                : (<i className="fas fa-plus"></i>)}
        </span>
    )
}
