import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addItemToCart } from '../actions';

const InStockButton = ({ count, product, addItemToCart }) => {
  const navigate = useNavigate();

  if (count > 0) {
    return (
      <Button
        onClick={() => {
          addItemToCart(product);
          navigate('/cart');
        }}
      >
        Add to Cart
      </Button>
    );
  } else {
    return (
      <Button className="btn-danger" disabled>
        Out of Stock
      </Button>
    );
  }
};

// const mapStateToProps = (state) => {
//   return {
//     cart: state.cartReducer,
//   };
// };

export default connect(null, { addItemToCart })(InStockButton);
