import * as React from 'react';
import LogoDay from '../assets/S-day.svg';
import LogoNight from '../assets/S-night.svg';
import { RootContext } from './Root';

interface Props extends React.SVGAttributes<SVGSVGElement> {}

export default (props: Props) => {
  const { theme } = React.useContext(RootContext);

  return theme === 'day'
    ? <LogoDay { ...props } />
    : <LogoNight { ...props } />;
};
