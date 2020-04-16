import React, { Component } from 'react'
import Axios from 'axios'
import {artistUri, artistAblumsUri, artistTopTracksUri,albumUri} from '../../config'
import {connect} from 'react-redux'

export class ArtistContainer extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            artist_top_tracks: null,
            artist_albums: null,
            artist: null
        }
    }

    getArtistTopTracks(artist_id){
        Axios.get(artistTopTracksUri(artist_id), {
            headers: {'Authorization': `Bearer ${this.props.token}`}
        }).then(
            res => {
                this.setState({artist_top_tracks: res.data})}
        )
    }

    getArtistAlbums(artist_id){
        Axios.get(artistAblumsUri(artist_id), {
            headers: {'Authorization': `Bearer ${this.props.token}`}
        }).then(
            res => {this.setState({artist_albums:res.data.items})}
        )
    }

    getArtistDetails(artist_id){
        Axios.get(artistUri(artist_id), {
            headers: {'Authorization': `Bearer ${this.props.token}`}
        }).then(
            res => {this.setState({artist: res.data})}
        )
    }

    playAlbum(album_id){
        Axios({
            method: 'get',
            url: albumUri(album_id),
            headers: {
                'Authorization': `Bearer ${this.props.token}`,
            }
        }).then(
            res=>{
            let curAlbum = res.data
            this.props.fetchAudioAndDetails(curAlbum.tracks.items[0].id , curAlbum.tracks.items[0].preview_url)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentArtistId !== this.props.currentArtistId){
            let artist_id = this.props.currentArtistId
            this.getArtistDetails(artist_id)
            this.getArtistTopTracks(artist_id)
            this.getArtistAlbums(artist_id)
        }
    }

    render() {
        if(this.state.artist && this.state.artist_albums && this.state.artist_top_tracks)
        {
            return (
                <div className="artist-container">
                    <div>
                        <div className="artist-details">
                            <div className="artist-img">
                                <img src={this.state.artist.images[0] ? (this.state.artist.images[0].url):("")} alt=""/>
                            </div>
                            <div className="artist-info">
                                <span>{this.state.artist.name}</span>
                                <div className="my-2">
                                    <span>{this.state.artist.genres.map((genre,index)=>(<span className="clickable genre" key={`genre-${index}`} onClick={() => this.props.setGenre(genre)}>{genre}</span>))}</span>
                                </div>
                                <span className="muted-text-light">{this.state.artist.followers.total} followers</span>
                            </div>
                        </div>
                        <div className="top-tracks">
                            <span>Top Tracks</span>
                            <div className="song-container">
                                {this.state.artist_top_tracks.tracks.filter(track => (track.preview_url))
                                .map((track, index) => (
                                <img key={`track-${index}`} onClick={() => this.props.fetchAudioAndDetails(track.id, track.preview_url)} src={track.album.images[0].url} alt=""/>
                                ))}
                            </div>
                        </div>
                        <div className="top-tracks">
                            <span>Albums</span>
                            <div className="song-container">
                                {this.state.artist_albums
                                .filter(album => album.album_group === "album")
                                .map((album, index) => (
                                <img key={`album-${index}`}  onClick={() => this.playAlbum(album.id)} src={album.images[0].url} alt=""/>
                                ))}
                            </div>
                        </div>
                        <div className="top-tracks">
                            <span>Single</span>
                            <div className="song-container">
                                {this.state.artist_albums
                                .filter(album => album.album_group === "single")
                                .map((album, index) => (
                                <img key={`single-${index}`} onClick={() => this.playAlbum(album.id)} src={album.images[0].url} alt=""/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return null
        }
        
    }
}

const mapStateToProps = (state) => {
    return{
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(ArtistContainer)
