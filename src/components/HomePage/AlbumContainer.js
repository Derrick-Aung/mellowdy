import React, { Component } from 'react'
import Axios from 'axios'
import {albumUri} from '../../config'
import {connect} from 'react-redux'

export class AlbumContainer extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            album: null
        }
    }

    componentDidMount() {
    }
    

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentAlbum !== this.props.currentAlbum){
            let album_id = this.props.currentAlbum.id
            Axios({
                method: 'get',
                url: albumUri(album_id),
                headers: {
                    'Authorization': `Bearer ${this.props.token}`,
                }
            }).then(
                res=>{
                    this.setState({
                    album: res.data
                })
            })
        }
    }

    render() {
        if(this.state.album)
        {
            return (
                <div className="artist-container">
                    <div>
                        <div className="artist-details">
                            <div className="artist-img">
                                <img src={this.state.album.images[1].url} alt=""/>
                            </div>
                            <div className="artist-info">
                                <span>{this.state.album.name}</span>
                                <span>By {this.state.album.artists[0].name}</span>
                                <span>Released {this.state.album.release_date}</span>
                            </div>
                        </div>
                        <div className="album-tracks">
                            <span>Tracks</span>
                            <div className="song-list-container">
                                {this.state.album.tracks.items.filter(song => (song.preview_url))
                                .map((song, index) => (
                                <div className="album-song">
                                    <img onClick={() => this.props.fetchAudioAndDetails(song,song.artists[0].id)} src={this.state.album.images[1].url} alt=""/>
                                    <span className="ml-3">{song.name}</span>
                                </div>
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

export default connect(mapStateToProps)(AlbumContainer)
