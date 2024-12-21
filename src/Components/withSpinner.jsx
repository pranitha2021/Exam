import React from 'react';

function withSpinner(WrappedComponent) {
  return function SpinnerWrapper({ isLoading, ...props }) {
    if (isLoading) {
      return <div className="spinner">Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

export default withSpinner;