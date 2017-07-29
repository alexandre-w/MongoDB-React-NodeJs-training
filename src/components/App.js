import React from 'react' ;
import Header from './Header' ;
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';

const pushState = (obj, url) =>
window.history.pushState(obj, '', url);

class App extends React.Component {

  static PropTypes = {
    initialData: React.PropTypes.object.isRequired
  };

  state = this.props.initialData;

  fetchContest = (contestId) => {
    pushState(
      { currentContestId: contestId},
      `/contests/${contestId}`
    );

    api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest.id,
        contests: {
          ...this.state.contests,
          [contest.id]: contest
        }
      });
    });

  };

  currentContest() {
    return this.state.contests[this.state.currentContestId];
  }

  pageHeader() {
    if(this.state.currentContestId){
      return this.currentContest().contestName;
    }
    return 'Naming Contest';
  }

  currentContent() {
    if (this.state.currentContestId) {
      return <Contest {...this.currentContest()} />;
    }

    return <ContestList
      onContestClick={this.fetchContest}
      contests={this.state.contests} /> ;
  }



  render() {
    return (
      <div className="App">
        <Header message={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
}

export default App;
