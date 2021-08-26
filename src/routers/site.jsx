import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BackTop } from 'antd';
import { connect } from 'react-redux';
import Footer from '../components/layouts/footer/footer.layout';
import Menu from '../components/layouts/menu/menu.layout';
import { ProgrammaticManagementProvider } from '../utils/context/programmaticManagement/ProgrammaticManagment.context';
import { routesSite } from '../const/routes.const';
import topButtonImage from '../assets/images/cy_topbutton@3x.png';
import useStatistics from '../utils/hooks/statistics/useStatistics.hook';

const RouteSite = ({ displayPercentage, isOpen, history }) => {
  const { setTealium } = useStatistics();
  useEffect(() => {
    window['redirect'] = history;
    setTealium({
      type: 'view',
      structure: {
        tealium_event: 'view',
        pagePath: history.location.pathname,
      },
    });
    history.listen(current => {
      window.scrollTo(0, 0);
      setTealium({
        type: 'view',
        structure: { tealium_event: 'view', pagePath: current.pathname },
      });
    });
  }, [history]);
  const styles = {
    width: isOpen
      ? window.innerWidth >= 1441
        ? window.innerWidth - 360 + 'px'
        : 100 - displayPercentage + '%'
      : '100%',
    marginLeft: isOpen
      ? window.innerWidth >= 1441
        ? '360px'
        : displayPercentage + 'vw'
      : '0vw',
    paddingLeft: isOpen ? '1vw' : '0px',
    boxSizing: 'border-box',
  };
  return (
    <>
      <BackTop>
        <img src={topButtonImage} style={{ width: '100%' }} alt="Ir Arriba" />
      </BackTop>
      <div style={window.innerWidth >= 768 ? styles : {}}>
        <ProgrammaticManagementProvider>
            <Menu />
        </ProgrammaticManagementProvider>
        <Switch>
          {routesSite.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              render={route.component}
              exact
            />
          ))}
          <Redirect to="/error" />
        </Switch>
        <Footer />
      </div>
    </>
  );
};
const mapStateToProps = ({ menu }) => {
  return {
    displayPercentage: menu.displayPercentage,
    isOpen: menu.isOpen,
  };
};
export default connect(mapStateToProps)(RouteSite);
