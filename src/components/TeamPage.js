import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TeamLogo from './TeamLogo';
import Team from './Team';
import Loading from './Loading';
import { 
  getTeamsArticles, 
  getTeamNames } from '../api';
import slug from 'slug';

export default class TeamPage extends Component {
  state = {
    articles: [],
    teamNames: {},
    loading: true
  }

  componentDidMount() {
    Promise.all([
      getTeamsArticles(this.props.match.params.teamId),
      getTeamNames()
    ])
    .then(([articles, teamNames]) => this.setState({ 
      articles, 
      teamNames,
      loading: false
    }))
  }

  render() {
    const { articles, loading, teamNames } = this.state;
    const { match } = this.props;
    const { teamId } = match.params;

    if(!loading && !teamNames.includes(teamId)) {
      return <Redirect to="/"/>
    }

    return (
      <div>
        <Team id={teamId}>
          {(team) => team === null 
            ? <Loading/>
            : <div className="panel">
                <TeamLogo id={teamId} />

                <h1 className="medium-header">{team.name}</h1>

                <h4 style={{margin: 5}}>
                  <Link
                    style={{cursor: "pointer"}}
                    to={{
                      pathname: "/players",
                      search: `?teamId=${teamId}`
                    }}
                  >
                    View Roster
                  </Link>
                </h4>
                
                <ul className="championships">
                  {team.championships.map((ship) => (
                    <li key={ship}>{ship}</li>
                  ))}
                </ul>

                <ul className="info-list row" style={{width: "100%"}}>
                  <li>Established
                    <div>{team.established}</div>
                  </li>
                  <li>Manager
                    <div>{team.manager}</div>
                  </li>
                  <li>Coach
                    <div>{team.coach}</div>
                  </li>
                  <li>Record
                    <div>{team.wins}-{team.losses}</div>
                  </li>
                </ul>

                <h2 className="header">Articles</h2>

                <ul className="articles">
                  {articles.map((article) => (
                    <li key={article.id}>
                      <Link 
                        to={`${match.url}/articles/${slug(article.title)}`}
                      >
                        <h4 className="article-title">
                          {article.title}
                        </h4>
                        <div className="article-date">
                          {article.date.toLocaleDateString()}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>}
        </Team>
      </div>
    )
  }
}