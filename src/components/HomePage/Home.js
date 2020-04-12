import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchRecentlyPlayed} from '../../actions/melodyActions'
import Axios from 'axios'
import {artistTopTracksUri,
    saveTrackToLibUri,
    saveTrackToPlaylistUri,
    checkUserLibUri,
    artistUri} from '../../config'
import TagBar from '../TagBar/TagBar'
import PrimaryContainer from './PrimaryContainer'
import {RECENTLY_PLAYED, YOUR_TOP_TRACKS, CHARTS} from '../TagBar/TagConstants'
import ArtistContainer from './ArtistContainer'
import SongContainer from './SongContainer'
import {authEndPoint,clientID,redirectUri,scopes} from '../../config'

export class Home extends Component {

    constructor(){
        super();
        this.state = {
            showOnlyPlayable: true,
            dataReady: true,
            isFetching: true,
            songPlaying: false,
            currentSong: null,
            audio: null,
            currentArtistTracks: null,
            currentTab: RECENTLY_PLAYED,
            trackInLibrary: false,
            currentArtist: null
        }
        this.fetchAudioAndDetails = this.fetchAudioAndDetails.bind(this);
        this.changeTab = this.changeTab.bind(this)
        this.setIsFetching = this.setIsFetching.bind(this)
        this.addTrackToLib = this.addTrackToLib.bind(this)
        this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this)
    }

    componentDidMount(){
        
    }

    fetchAudioAndDetails(song, artist_id){
        this.playAudio(song)
        this.getArtistDetails(artist_id)
        this.getArtistTopTracks(artist_id)
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

    playAudio(song){
        const previewUrl = song.preview_url
        let audio = new Audio(previewUrl)
        
        if (!this.state.songPlaying){
            audio.play();
            
            this.setState(
                {
                    songPlaying: true,
                    currentSong: song,
                    audio,
                }
            )
        }else{
            if(this.state.currentSong.preview_url == previewUrl){
                this.state.audio.pause();
                this.setState(
                    {
                        songPlaying: false,
                    }
                )
            }else{
                this.state.audio.pause()
                audio.play()
                this.setState(
                    {
                        songPlaying:true,
                        currentSong: song,
                        audio,
                    }
                )
            }
        }
        this.checkTrackInLib(song.id)
    }

    changeTab(tab){
        this.setState({
            currentTab: tab
        })
    }

    //TODO delete this
    testFunc(){
        console.log(
            "asdf"
        )
    }

    getArtistTopTracks(artist_id){
        Axios.get(artistTopTracksUri(artist_id), {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then(
            res => {
                this.setState(
                    {currentArtistTracks: res.data}
                )
            }
        )
    }

    getArtistDetails(artist_id){
        Axios.get(artistUri(artist_id), {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then(
            res => {
                this.setState(
                    {currentArtist: res.data}
                )
            }
        )
    }

    isDataReady(){
        if(this.props.recentlyPlayed.length > 0 && this.props.token){
            return true
        }else{
            return false
        }
    }

    setIsFetching(boolean){
        this.setState({
            isFetching:boolean
        })
    }

    addTrackToLib(){
        let track_id = this.state.currentSong.id
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
        let track_uri = this.state.currentSong.uri
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
                        currentSong={this.state.currentSong} 
                        addTrackToLib={this.addTrackToLib} 
                        addTrackToPlaylist={this.addTrackToPlaylist}
                        trackInLibrary={this.state.trackInLibrary}/>
                    </div>
                    <ArtistContainer 
                    currentSong={this.state.currentSong} 
                    currentArtistTracks={this.state.currentArtistTracks}
                    fetchAudioAndDetails={this.fetchAudioAndDetails}
                    currentArtist={this.state.currentArtist}
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
