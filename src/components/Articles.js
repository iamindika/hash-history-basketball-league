import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Article from './Article';
import Loading from './Loading';
import { getTeamsArticles } from '../api';

export default class Articles extends Component {
  state = {
    teamsArticles: [], 
    loading: true
  }

  componentDidMount() {
    const { teamId } = this.props.match.params;

    getTeamsArticles(teamId) 
      .then((teamsArticles) => this.setState({
        teamsArticles: teamsArticles.map((article) => article.title),
        loading: false
      }));
  }

  render() {
    const { teamsArticles, loading } = this.state;
    const { url, params } = this.props.match;
    const { teamId } = params;
    
    return loading === true
      ? <Loading/>
      : <div className="container two-column">
          <Sidebar
            title="Articles"
            list={teamsArticles}
            loading={loading}
            {...this.props}
          />

          <Route path={`${url}/:articleId`} render={({ match }) => (
            <Article 
              articleId={match.params.articleId} 
              teamId={teamId}
            >
              {(article) => !article 
                ? <Loading/>
                : <div className="panel">
                    <h1 className="header">{article.title}</h1>
                    <p>{article.body}</p>
                  </div>}
            </Article>
          )} />
        </div>
  }
}