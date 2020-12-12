import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UnconnectedAlerts = ({ alerts }) => {
  return (
    <div data-test='component-alerts'>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <div data-test='alerts-alert' key={alert.id}>
            {alert.msg}
          </div>
        ))}
    </div>
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
