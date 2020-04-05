import React, { Component } from 'react'
import {fetchRecentlyPlayed, fetchUserTopTracks, fetchCharts} from '../../actions/melodyActions'
import {connect} from 'react-redux'
import { RECENTLY_PLAYED,YOUR_TOP_TRACKS, CHARTS } from '../Tags/TagConstants'

export class PrimaryContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataReady: false,
            currentDisplaying: null 
        }
    }

    componentDidUpdate(){
        
    }

    render() {

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
                    return null
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
                    return null
            }
        }
        
        
        return (
            <div>
                
                <div className="primary-container my-4">
                    <h2>{this.props.currentTab}</h2>
                    {!this.props.isFetching && currentDisplay &&
                    <div className="grid-container my-4">
                        {currentDisplay.filter(song => (song.preview_url))
                        .map((song, index) => (
                            <div className="song-container">
                                <img onClick={() => this.props.fetchAudioAndDetails(song,song.artists[0].id)} src={song.album.images[0].url} alt=""/>
                                {/* <span>{song.track.preview_url ? ("[OK] "):("")}{song.track.name}</span> */}
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
        charts: state.melodies.charts
    }
}

const mapDispatchToProps = {fetchRecentlyPlayed, fetchUserTopTracks, fetchCharts}

export default connect(mapStateToProps,mapDispatchToProps)(PrimaryContainer)

// dataready should be set to false when clicked on tag(Props??)