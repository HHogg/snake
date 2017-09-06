import { connect } from 'react-redux';
import About from './About';

export default connect((state) => ({
  isAboutActive: state.application.about,
  isLoggedIn: !!state.user.id,
}), {})(About);
