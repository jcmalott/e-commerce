import Button from 'react-bootstrap/Button';

const InStockButton = ({ count }) => {
  if (count > 0) return <Button>Add to Cart</Button>;
  else
    return (
      <Button className="btn-danger" disabled>
        Out of Stock
      </Button>
    );
};

export default InStockButton;
