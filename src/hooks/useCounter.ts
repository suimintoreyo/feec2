import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from '../store/slices/counterSlice'

export const useCounter = () => {
  const dispatch = useDispatch()
  const count = useSelector((state: any) => state.counter.value)

  const incrementCount = () => {
    dispatch(increment())
  }

  const decrementCount = () => {
    dispatch(decrement())
  }

  const incrementCountByAmount = (amount: number) => {
    dispatch(incrementByAmount(amount))
  }

  return { count, incrementCount, decrementCount, incrementCountByAmount }
}
