import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchRecentlyPlayed} from '../../actions/melodyActions'
import Axios from 'axios'
import {convertTrackIdToUri,
    saveTrackToLibUri,
    saveTrackToPlaylistUri,
    checkUserLibUri,
    albumUri,
    trackUri} from '../../config'
import TagBar from '../TagBar/TagBar'
import PrimaryContainer from './PrimaryContainer'
import {RECENTLY_PLAYED, YOUR_TOP_TRACKS, CHARTS} from '../TagBar/TagConstants'
import ArtistContainer from './ArtistContainer'
import SongContainer from './SongContainer'
import {authEndPoint,clientID,redirectUri,scopes} from '../../config'
import AlbumContainer from './AlbumContainer'

export class Home extends Component {

    constructor(){
        super();
        this.state = {
            showOnlyPlayable: true,
            dataReady: true,
            isFetching: true,
            songPlaying: false,
            audio: null,
            currentTab: RECENTLY_PLAYED,
            trackInLibrary: false,
            currentArtistId: null,
            currentAlbumId: null,
            currentTrackId: null,
            currentTrack: null,
            currentGenre: null,
        }
        this.fetchAudioAndDetails = this.fetchAudioAndDetails.bind(this);
        this.changeTab = this.changeTab.bind(this)
        this.setIsFetching = this.setIsFetching.bind(this)
        this.addTrackToLib = this.addTrackToLib.bind(this)
        this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this)
        this.setGenre = this.setGenre.bind(this)
    }

    componentDidMount(){
        
    }

    // this should be name handleTrackClick or smth
    fetchAudioAndDetails(track_id, track_preview_url){
        this.playAudio(track_id, track_preview_url)
    }

    checkTrackInLib(track_id){
        Axios.get(checkUserLibUri(track_id), {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then(
            data => {
                let result = data.data[0]
                this.setState({
                    trackInLibrary: result
                })
                
            }    
        )
    }

    processTrack(){
        
    }

    playAudio(track_id, track_preview_url){

        let audio = new Audio(track_preview_url)

        Axios.get(trackUri(track_id), {
            headers: {'Authorization': `Bearer ${this.props.token}`}
        }).then(
            res => {
            let curTrack = res.data
            let curAlbumId = curTrack.album.id
            let curArtistId = curTrack.artists[0].id
            if (!this.state.songPlaying){
            audio.play();
            this.setState({
                    songPlaying: true,
                    currentTrack: res.data,
                    currentAlbumId: curAlbumId,
                    currentArtistId: curArtistId,
                    currentTrackId: track_id,
                    audio,
                })
            }else{
                if(this.state.currentTrackId == track_id){
                    this.state.audio.pause();
                    this.setState(
                        {
                            songPlaying: false,
                        }
                    )
                }else{
                    this.state.audio.pause()
                    audio.play()
                    this.setState({
                        songPlaying:true,
                        currentTrack: res.data,
                        currentAlbumId: curAlbumId,
                        currentArtistId: curArtistId,
                        currentTrackId: track_id,
                        audio,})
                }
            }}
        )

        
        this.checkTrackInLib(track_id)
    }

    changeTab(tab){
        this.setState({
            currentTab: tab
        })
    }

    setGenre(genre){
        this.setState({
            currentGenre: genre,
            currentTab: genre,
            isFetching: true
        })
    }

    setIsFetching(boolean){
        this.setState({
            isFetching:boolean
        })
    }

    addTrackToLib(){
        let track_id = this.state.currentTrackId
        Axios({
            method: 'put',
            url: saveTrackToLibUri(track_id),
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then(
            this.setState(
                {
                    trackInLibrary: true
                }
            )
        )
    }


    addTrackToPlaylist(playlist_id){
        let track_uri = convertTrackIdToUri(this.state.currentTrackId)
        Axios({
            method: 'post',
            url: saveTrackToPlaylistUri(playlist_id, track_uri),
            headers: {
                'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
            }
        }).then(
            console.log("Added track to playlist")
        )
    }

    render() {
        if(!this.props || !this.props.token){
            return (
                <div className="login-container">
                    <span>The new way to discover music feat. The Spotify API</span>
                    <br/>
                    <span className="muted-text">A web project by Aung Phone Khant (Derrick)</span>
                    <div><span className="tag mt-3">
                        <a href={`${authEndPoint}?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true&scope=${scopes.join("%20")}`}>
                            Login To Spotify First
                        </a></span></div>
                </div>
            )
        }else{
            return (
                <div>
                    <TagBar changeTab={this.changeTab} setIsFetching={this.setIsFetching}/>
                    <div className="main-container">
                        <PrimaryContainer 
                        isFetching={this.state.isFetching} 
                        setIsFetching={this.setIsFetching}
                        currentTab={this.state.currentTab} 
                        fetchAudioAndDetails={this.fetchAudioAndDetails}/>
                        <SongContainer 
                        currentTrackId={this.state.currentTrackId} 
                        addTrackToLib={this.addTrackToLib} 
                        addTrackToPlaylist={this.addTrackToPlaylist}
                        trackInLibrary={this.state.trackInLibrary}
                        />
                    </div>
                    <ArtistContainer 
                    currentArtistId={this.state.currentArtistId}
                    fetchAudioAndDetails={this.fetchAudioAndDetails}
                    playAlbum={this.playAlbum}
                    setGenre={this.setGenre}
                    />
                    <AlbumContainer 
                    currentAlbumId={this.state.currentAlbumId}
                    fetchAudioAndDetails={this.fetchAudioAndDetails}
                    />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        recentlyPlayed: state.melodies.recently_played_songs
    }
}

const mapDispatchToProps = {fetchRecentlyPlayed}


export default connect(mapStateToProps,mapDispatchToProps)(Home)
