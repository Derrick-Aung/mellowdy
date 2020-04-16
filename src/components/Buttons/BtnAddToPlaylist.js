import React, { Component } from 'react'
import {connect} from 'react-redux'

export class BtnAddToPlaylist extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            showMenu: false,
        }
        this.showMenu = this.showMenu.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
    }

    showMenu(event) {
        event.preventDefault();
        this.setState({
            showMenu:true
        }, () => {
            document.addEventListener('click', this.closeMenu)
        })
    }

    closeMenu(event) {
        if(!this.dropdownMenu.contains(event.target)){
            this.setState({
                showMenu:false
            }, () => {
                document.removeEventListener('click', this.closeMenu)
            })
        }
    }

    render() {
        return (
           <span className="add-button mx-2" onClick={this.showMenu} >
                <i className="fas fa-list"></i>
                {
                this.state.showMenu ? (
                     <div className="playlist-menu" ref={(element) => {
                        this.dropdownMenu = element;
                    }}>
                        {
                        this.props.user_playlists.map(
                            playlist => (
                                <button key={playlist.id} onClick={() => this.props.addTrackToPlaylist(playlist.id)}>{`+ ${playlist.name}`}</button>
                            )
                        )
                        }
                    </div>
                ):(
                    null
                )
                }
            </span>
            
        )
    }
}

const mapStateToProps=(state) => {
    return{
        user_playlists: state.melodies.user_playlists
    }
}

export default connect(mapStateToProps)(BtnAddToPlaylist)
