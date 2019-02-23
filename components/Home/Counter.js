import { Button } from 'antd';

const Counter = (props) => { 
  const { count, increment, decrement,  reset} = props;
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
};

export default Counter;

  

