import { useCounter } from '../hooks/useCounter'

const Counter = () => {
  const { count, incrementCount, decrementCount, incrementCountByAmount } = useCounter()

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={incrementCount}>Increment</button>
      <button onClick={decrementCount}>Decrement</button>
      <button onClick={() => incrementCountByAmount(5)}>Increment by 5</button>
    </div>
  )
}

export default Counter
