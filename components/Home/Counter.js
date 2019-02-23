import { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { increment, decrement, reset } from '../../redux/actions';

class Counter extends Component {

  render () {
    const { count,increment,decrement,reset} = this.props;
    return (
      <div>
        <style jsx>{`
          div {
            padding: 0 0 20px 0;
          }
        `}</style>
        <h1>
          Count: <span>{count}</span>
        </h1>
        <Button onClick={increment}>+1</Button>
        <Button onClick={decrement}>-1</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    );
  }
}

const mapStateToProps = ({ count }) => ({ count });
const mapDispatchToProps = (dispatch) => ({ 
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
  reset: () => { dispatch(reset());}
});
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
