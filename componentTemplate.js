import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

@connect(state => ({}))
export default class {{displayName}} extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className="panel panel-inverted">
        <p>{{displayName}}</p>
        <div className="panel-actions">
        </div>
      </div>
    );
  }
}

