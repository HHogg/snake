import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import About from '../../containers/About';
import SnakeHeuristicsSVG from '../About/SnakeHeuristicsSVG';
import './IntroModal.css';

export default class IntroModal extends Component {
  static propTypes = {
    onSkipIntro: PropTypes.func.isRequired,
    skipIntro: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      closing: false,
      closed: false,
      shown: false,
    };
  }

  componentDidMount() {
    const { skipIntro } = this.props;

    window.setTimeout(() => {
      if (skipIntro) {
        this.close();
      } else {
        this.setState({ shown: true });
      }
    }, 3000);
  }

  close() {
    this.setState({ closing: true });
    window.setTimeout(() => {
      this.setState({ closed: true });
    }, 400);
  }

  skip() {
    const { onSkipIntro } = this.props;

    this.close();
    onSkipIntro();
  }

  render() {
    const { closed, closing, shown } = this.state;
    const classes = classnames('sh-intro__modal', {
      'sh-intro__modal--closing': closing,
      'sh-intro__modal--shown': shown,
    });

    if (closed) {
      return null;
    }

    return (
      <div className={ classes }>
        <div className="sh-intro__logo">
          <SnakeHeuristicsSVG />
        </div>

        <div className="sh-intro__steps">
          <About
              onPlay={ () => this.close() }
              onSkip={ () => this.skip() } />
        </div>
      </div>
    );
  }
}
