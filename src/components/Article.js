import { Component } from 'react';
import { getArticle } from '../api';
import PropTypes from 'prop-types';

export default class Article extends Component {
  static propTypes = {
    articleId: PropTypes.string.isRequired,
    teamId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  }

  state = {
    article: null
  }

  componentDidMount() {
    const { teamId, articleId } = this.props;

    this.fetchArticle(teamId, articleId);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.articleId !== this.props.articleId) {
      this.fetchArticle(nextProps.teamId, nextProps.articleId);
    }
  }

  fetchArticle = (teamId, articleId) => {
    this.setState({ article: null });

    getArticle(teamId, articleId)
      .then((article) => this.setState({ article }));
  }

  render() {
    const { article } = this.state;
    const { children } = this.props;

    return children(article);
  }
}
