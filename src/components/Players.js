import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import { parse } from 'query-string';
import { getPlayers } from '../api';
import slug from 'slug';

export default class Players extends Component {
  state = {
    players: [],
    loading: true
  }

  fetchPlayers = (teamId) => {
    getPlayers(teamId)
      .then((players) => this.setState({
        loading: false,
        players
      }))
  }

  componentDidMount() {
    const {location} = this.props;

    location.search 
      ? this.fetchPlayers(parse(location.search).teamId)
      : this.fetchPlayers()
    
  }
  render() {
    const {players, loading} = this.state;
    const {match, location} = this.props;

    return (
      <div className="container two-column">
        <Sidebar 
          title="Players"
          list={players.map((player) => player.name)}
          loading={loading}
          {...this.props}
        />

        {loading === false && location.pathname === "/players"
          ? <div className="sidebar-instruction">
              Please select a player
            </div>
          : null}

        <Route path={`${match.url}/:playerId`} render={({match}) => {
          if(loading) {
            return null;
          }

          const { 
            apg, avatar, name, number, 
            position, ppg, rpg, spg, teamId 
          } = players.find((player) => (
            slug(player.name) === match.params.playerId
            ));

          return (
            <div className="panel">
              <img 
                className="avatar"
                src={`${avatar}`}
                alt={`${name}'s avatar`}
              />
              <h1 className="medium-header">{name}</h1>
              <h3 className="header">#{number}</h3>

              <div className="row">
                <ul 
                  className="info-list" 
                  style={{marginRight: 80}}
                >
                  <li>Team
                    <div>
                      <Link 
                        to={`/${teamId}`}
                        style={{color: "#68809a"}}
                      >
                        {teamId[0].toUpperCase() + teamId.slice(1)}
                      </Link>
                    </div>
                  </li>
                  <li>Position<div>{position}</div></li>
                  <li>PPG<div>{ppg}</div></li>
                </ul>

                <ul className="info-list">
                  <li>APG<div>{apg}</div></li>
                  <li>RPG<div>{rpg}</div></li>
                  <li>SPG<div>{spg}</div></li>
                </ul>
              </div>
            </div>
          )
        }}/>
      </div>
    )
  }
}