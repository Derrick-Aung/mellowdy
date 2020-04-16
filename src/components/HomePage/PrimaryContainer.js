import React, { Component } from 'react'
import {fetchRecentlyPlayed, fetchUserTopTracks, fetchCharts, fetchGenre} from '../../actions/melodyActions'
import {connect} from 'react-redux'
import { RECENTLY_PLAYED,YOUR_TOP_TRACKS, CHARTS } from '../TagBar/TagConstants'

export class PrimaryContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataReady: false,
            currentDisplay:null
        }
    }

    componentDidMount(){
        let currentDisplay = null
        if(this.props.isFetching){
            switch(this.props.currentTab){
                case RECENTLY_PLAYED:
                    this.props.fetchRecentlyPlayed(this.props.token)
                    break
                case YOUR_TOP_TRACKS:
                    this.props.fetchUserTopTracks(this.props.token)
                    break
                case CHARTS:
                    this.props.fetchCharts(this.props.token)
                    break
                default:
                    console.log("default")
                    this.props.fetchGenre(this.props.token, this.props.currentTab)
                    break
            }
            this.props.setIsFetching(false)
        }else{
            switch(this.props.currentTab){
                case RECENTLY_PLAYED:
                    currentDisplay = this.props.recentlyPlayed
                    break
                case YOUR_TOP_TRACKS:
                    currentDisplay = this.props.userTopTracks
                    break
                case CHARTS:
                    currentDisplay = this.props.charts
                    break
                default:
                    console.log("default")
                    currentDisplay = this.props.genreTracks
                    break
            }
        }
        
    }

    componentDidUpdate(prevProps, prevState){
        let currentDisplay = null
        if(this.props.isFetching){
            switch(this.props.currentTab){
                case RECENTLY_PLAYED:
                    this.props.fetchRecentlyPlayed(this.props.token)
                    break
                case YOUR_TOP_TRACKS:
                    this.props.fetchUserTopTracks(this.props.token)
                    break
                case CHARTS:
                    this.props.fetchCharts(this.props.token)
                    break
                default:
                    console.log("default")
                    this.props.fetchGenre(this.props.token, this.props.currentTab)
                    break
            }
            this.props.setIsFetching(false)
        }else{
            switch(this.props.currentTab){
                case RECENTLY_PLAYED:
                    currentDisplay = this.props.recentlyPlayed
                    break
                case YOUR_TOP_TRACKS:
                    currentDisplay = this.props.userTopTracks
                    break
                case CHARTS:
                    currentDisplay = this.props.charts
                    break
                default:
                    console.log("default")
                    currentDisplay = this.props.genreTracks
                    break
            }
            if(prevState.currentDisplay !== currentDisplay){
                this.setState({
                    currentDisplay: currentDisplay
                })
            }
        }
        
        
    }

    render() {
        return (
            <div className="primary-container my-4">
                
                <div >
                    <h2>{this.props.currentTab}</h2>
                    {!this.props.isFetching && this.state.currentDisplay &&
                    <div className="grid-container my-4">
                        {this.state.currentDisplay.filter(song => (song.preview_url))
                        .map((song, index) => (
                            <div className="song-container" key={index}>
                                <img onClick={() => this.props.fetchAudioAndDetails(song.id,song.preview_url)} src={song.album.images[0].url} alt=""/>
                            </div>
                        ))}
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        recentlyPlayed: state.melodies.recently_played_songs,
        userTopTracks: state.melodies.user_top_tracks,
        charts: state.melodies.charts,
        genreTracks: state.melodies.genre_tracks
    }
}

const mapDispatchToProps = {fetchRecentlyPlayed, fetchUserTopTracks, fetchCharts, fetchGenre}

export default connect(mapStateToProps,mapDispatchToProps)(PrimaryContainer)

// dataready should be set to false when clicked on tag(Props??)