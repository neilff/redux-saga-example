import React from 'react';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import { requestProducts } from '../reducers/products';

function mapStateToProps(state) {
  return {
    products: state.products,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStart: () => dispatch(requestProducts()),
  };
}

const Products = ({ products, loading, onStart }) => {
  return (
    <div className="container">
      <Loading isVisible={ loading } />

      <h1>Request Example</h1>

      <button
        disabled={ products.get('isLoading') }
        onClick={ onStart }
        className="m1 btn btn-primary">Request Products</button>

      {
        products.get('result').map(i => {
          return (
            <div key={ i.get('id') }>
              { i.get('name') }
            </div>
          );
        })
      }
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
