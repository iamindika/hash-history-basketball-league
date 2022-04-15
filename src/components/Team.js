import { Component } from 'react';
import PropTypes from 'prop-types';
import { getTeam } from '../api';

export default class Team extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  }

  state = {
    team: null
  }

  fetchTeam = (id) => {
    this.setState({ team: null });

    getTeam(id)
      .then(( team ) => this.setState({ team }));
  }

  componentDidMount() {
    this.fetchTeam(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.id !== this.props.id) {
      this.fetchTeam(nextProps.id);
    }
  }

  render() {
    const { team } = this.state;
    const { children } = this.props;

    return children(team);
  }
}