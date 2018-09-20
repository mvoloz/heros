import React from 'react';
import { connect } from 'react-redux';

const Loader = props => (props.isLoading ? <div>LOADING</div> : null);

export default connect(state => ({
  isLoading: state.heros.isLoading
}))(Loader);
