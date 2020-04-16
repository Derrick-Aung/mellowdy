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
        if (prevProps.currentAlbumId !== this.props.currentAlbumId){
            let album_id = this.props.currentAlbumId
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
                <div className="album-container">
                    <div>
                        <div className="album-details">
                            <div className="album-img">
                                <img src={this.state.album.images[1].url} alt=""/>
                            </div>
                            <div className="album-info">
                                <span>{this.state.album.name}</span>
                                <span className="muted-text-light">By {this.state.album.artists[0].name}</span>
                                <span className="muted-text-light">Released {this.state.album.release_date}</span>
                            </div>
                        </div>
                        <div className="album-tracks">
                            <span>Tracks</span>
                            <div className="track-list-container">
                                {this.state.album.tracks.items.filter(track => (track.preview_url))
                                .map((track, index) => (
                                <div className="album-track mt-1" key={index}>
                                    <img onClick={() => this.props.fetchAudioAndDetails(track.id,track.preview_url)} src={this.state.album.images[1].url} alt=""/>
                                    <span className="ml-3">{track.name}</span>
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
