import Spinner from 'react-bootstrap/Spinner';

export default  function Loading() {
  return (
    <Spinner data-testid="loading" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

