import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchRecentlyPlayed} from '../../actions/melodyActions'
import Axios from 'axios'
import {artistTopTracksUri} from '../../config'
import Tag from '../Tag'
import PrimaryContainer from './PrimaryContainer'
import {RECENTLY_PLAYED, YOUR_TOP_TRACKS, CHARTS} from '../Tags/TagConstants'

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
            currentTab: RECENTLY_PLAYED
        }
        this.fetchAudioAndDetails = this.fetchAudioAndDetails.bind(this);
        this.changeTab = this.changeTab.bind(this)
        this.setIsFetching = this.setIsFetching.bind(this)
    }

    componentDidMount(){
        
    }

    fetchAudioAndDetails(song, artist_id){
        this.playAudio(song)
        this.getArtistDetails(artist_id)
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
                    audio
                }
            )
        }else{
            if(this.state.currentSong == previewUrl){
                this.state.audio.pause();
                this.setState(
                    {
                        songPlaying: false
                    }
                )
            }else{
                this.state.audio.pause()
                audio.play()
                this.setState(
                    {
                        songPlaying:true,
                        currentSong: song,
                        audio
                    }
                )
            }
        }
    }

    changeTab(tab){
        this.setState({
            currentTab: tab
        })
    }

    testFunc(){
        console.log(
            "asdf"
        )
    }

    getArtistDetails(artist_id){
        Axios.get(artistTopTracksUri(artist_id), {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then(
            data => {
                console.log(data.data)
                this.setState(
                    {
                        currentArtistTracks: data.data
                    }
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

    render() {
        if(!this.props || !this.props.token){
            return (
                <div>Login To Spotify First</div>
            )
        }else{
            if(false && !this.isDataReady()){
                this.props.fetchRecentlyPlayed(this.props.token)
                return (<div>Please wait while we fetch your data..</div>)
            }else{
                return (
                    <div>
                        <Tag 
                        name={RECENTLY_PLAYED} 
                        changeTab={this.changeTab}
                        setIsFetching={this.setIsFetching}/>
                        <Tag 
                        name={YOUR_TOP_TRACKS} 
                        changeTab={this.changeTab}
                        setIsFetching={this.setIsFetching}/>
                        <Tag name="Top Artists"/>
                        <Tag 
                        name={CHARTS}
                        changeTab={this.changeTab}
                        setIsFetching={this.setIsFetching}/>
                        <div className="main-container">
                            <PrimaryContainer 
                            isFetching={this.state.isFetching} 
                            setIsFetching={this.setIsFetching}
                            currentTab={this.state.currentTab} 
                            fetchAudioAndDetails={this.fetchAudioAndDetails}/>
                            <div>
                                {this.state.currentSong && 
                                    <div className="details-container">
                                        <div>
                                            <div className="details-main-img">
                                                <img src={this.state.currentSong.album.images[0].url} alt=""/>
                                            </div>
                                            <span>{`${this.state.currentSong.name} by `}</span>
                                            <span>{this.state.currentSong.artists.map((artist) => (artist.name)).join(' & ')}</span>
                                            <span>{`From the album ${this.state.currentSong.album.name}`}</span>
                                            <hr/>
                                        </div>
                                        <div className="top-tracks">
                                            <span>{`Top Tracks by ${this.state.currentSong.artists[0].name}`}</span>
                                            <div className="song-container">
                                                {this.state.currentArtistTracks && console.log(this.state.currentArtistTracks.tracks)}
                                                {this.state.currentArtistTracks && this.state.currentArtistTracks.tracks.filter(song => (song.preview_url))
                                                .map((song, index) => (
                                                <img onClick={() => this.fetchAudioAndDetails(song,song.artists[0].id)} src={song.album.images[0].url} alt=""/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
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
