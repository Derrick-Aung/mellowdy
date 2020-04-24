import React from 'react'
import Tag  from './Tag'
import {RECENTLY_PLAYED, YOUR_TOP_TRACKS, CHARTS} from '../TagBar/TagConstants'

export default function TagBar(props) {
    return (
        <div className="tag-container">
        <Tag 
            name={CHARTS}
            changeTab={props.changeTab}
            setIsFetching={props.setIsFetching}/>
            <Tag 
            name={RECENTLY_PLAYED} 
            changeTab={props.changeTab}
            setIsFetching={props.setIsFetching}/>
            <Tag 
            name={YOUR_TOP_TRACKS} 
            changeTab={props.changeTab}
            setIsFetching={props.setIsFetching}/>
        </div>
    )
}
