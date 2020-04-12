import React, { Component } from 'react'

export class ArtistContainer extends Component {
    
    constructor(props){
        super(props)
    }

    render() {
        if(this.props.currentSong && this.props.currentArtist)
        {
            return (
                <div className="artist-container">
                    {this.props.currentSong &&  this.props.currentArtist &&
                    <div>
                        <div className="artist-details">
                            <div className="artist-img">
                                <img src={this.props.currentArtist.images[1].url} alt=""/>
                            </div>
                            <div className="artist-info">
                                <span>{this.props.currentArtist.name}</span>
                                <span>{this.props.currentArtist.genres.map(genre=>genre).join(' , ')}</span>
                                <span>{this.props.currentArtist.followers.total} followers</span>
                            </div>
                        </div>
                        <div className="top-tracks">
                            <span>Top Tracks</span>
                            <div className="song-container">
                                {this.props.currentArtistTracks && this.props.currentArtistTracks.tracks.filter(song => (song.preview_url))
                                .map((song, index) => (
                                <img onClick={() => this.props.fetchAudioAndDetails(song,song.artists[0].id)} src={song.album.images[0].url} alt=""/>
                                ))}
                            </div>
                        </div>
                    </div>}
                </div>
            )
        }else{
            return null
        }
        
    }
}

export default ArtistContainer
