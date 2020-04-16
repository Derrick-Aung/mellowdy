import BtnAddToLib from '../Buttons/BtnAddToLib'
import BtnAddToPlaylist from '../Buttons/BtnAddToPlaylist'
import React, { Component } from 'react'
import {trackUri} from '../../config'
import Axios from 'axios'
import {connect} from 'react-redux'

export class SongContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
            track_id: null,
            track: null
        }
    }

    getTrack(track_id){
        Axios.get(trackUri(track_id), {
            headers: {'Authorization': `Bearer ${this.props.token}`}
        }).then(
            res => {
                this.setState({track: res.data})}
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentTrackId !== this.props.currentTrackId){
            this.getTrack(this.props.currentTrackId)
        }
    }

    render() {
        return (
            <div>
                
            {this.state.track && 
                <div className="details-container">
                    <div>
                        <div className="details-main-img">
                            <img src={this.state.track.album.images[0].url} alt=""/>
                            <div className="add-buttons">
                                <BtnAddToLib addTrackToLib={this.props.addTrackToLib} trackInLibrary= {this.props.trackInLibrary}/>
                                <BtnAddToPlaylist addTrackToPlaylist={this.props.addTrackToPlaylist}/>
                            </div>
                        </div>
                        <div className="details-info">
                            <div>
                                <span className="song-title-text">{this.state.track.name}</span>
                                <span className="muted-text">{this.state.track.artists.map((artist) => (artist.name)).join(' & ')}</span>
                                <span className="muted-text">{`From the album ${this.state.track.album.name}`}</span>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(SongContainer)
