import React from 'react';
import LogoComponent from '../components/LogoComponent';
import Navbar from '../../components/common/Navbar';
import ChatComponent from '../../components/common/ChatComponent';
import { connect } from 'react-redux';
import ProgressBar from '../../components/common/ProgressBarComponent';
import LoadingComponent from '../../components/common/LoadingComponent';
import { fetchMoreLogos, selectLogo } from '../actions';
import { withRouter } from 'react-router-dom'

const LogoList =  withRouter(({ concepts, generateMoreConcepts, isFetching, state, selectLogo, history }) => {
  const logos = [];

  concepts = concepts || [];

  concepts.forEach((concept) => {
    logos.push(
      <div style={{position: 'relative'}}>
        <LogoComponent concept={concept} selectLogo={selectLogo} history={history}/>
      </div>
    )
  });

  return (
    <div>
      <LoadingComponent isFetching={isFetching} />
      <Navbar />
      <div className="logomator-base inspiration">
        <div className="container" style={{ paddingBottom: '70px' }}>
          <ChatComponent
            text={
            <h1>
              <span>Here are the first set of logos I’ve designed for you!</span> Once you’ve found the perfect logo, download the logo files.
            </h1>}
          />

          <div className="logo-inspiration-container" style={{ paddingTop: '40px' }}>
            {logos}
          </div>

        </div>
      </div>
      <ProgressBar isGeneratingLogos={true} isGeneratingConcepts={true} generateMoreConcepts={generateMoreConcepts} state={state}/>
    </div>
  )
});

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  concepts: state.concepts,
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  generateMoreConcepts: (state) => {
    dispatch(fetchMoreLogos(state));
  },
  selectLogo: (logo) => {
    dispatch(selectLogo(logo))
  }
});

const LogoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoList);

export default LogoListContainer;