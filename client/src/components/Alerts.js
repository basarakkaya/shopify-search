import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Alert } from 'reactstrap';

const AlertContainer = styled.div`
  margin: 1rem 0px;
`;

const UnconnectedAlerts = ({ alerts }) => {
  return (
    <AlertContainer data-test='component-alerts'>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert
            data-test='alerts-alert'
            key={alert.id}
            color={alert.alertType}
          >
            {alert.msg}
          </Alert>
        ))}
    </AlertContainer>
  );
};

UnconnectedAlerts.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      alertType: PropTypes.string.isRequired,
      msg: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = ({ alert: alerts }) => ({
  alerts,
});

export default connect(mapStateToProps)(UnconnectedAlerts);
