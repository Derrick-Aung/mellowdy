import React from 'react'
import BtnAddToLib from '../Buttons/BtnAddToLib'
import BtnAddToPlaylist from '../Buttons/BtnAddToPlaylist'

export default function SongContainer(props) {
    return (
        <div>
            {props.currentSong && 
                <div className="details-container">
                    <div>
                        <div className="details-main-img">
                            <img src={props.currentSongImg} alt=""/>
                            <div className="add-buttons">
                                <BtnAddToLib addTrackToLib={props.addTrackToLib} trackInLibrary= {props.trackInLibrary}/>
                                <BtnAddToPlaylist addTrackToPlaylist={props.addTrackToPlaylist}/>
                            </div>
                        </div>
                        <div className="details-info">
                            <div>
                                <span className="song-title-text">{props.currentSong.name}</span>
                                <span className="muted-text">{props.currentSong.artists.map((artist) => (artist.name)).join(' & ')}</span>
                                <span className="muted-text">{`From the album ${props.currentAlbum.name}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
