import React, { Component, PropTypes } from 'react'

class Contest extends Component {
  render () {
    return (
      <div className="Contest">
      {this.props.description}
      </div>
    )
  }
}

Contest.PropTypes = {
  description: PropTypes.string.isRequired
};

export default Contest;
