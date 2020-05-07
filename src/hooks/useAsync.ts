import { useState, useRef } from 'react'

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

interface AsyncFn {
  (...args: any[]): Promise<any>
}

export enum Status {
  Initial = 'initial',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

export interface UseAsyncOptions<DataType> {
  defaultData?: DataType
  mergeStrategy?: (
    prevData: DataType | undefined,
    nextData: DataType
  ) => DataType
}

export interface PromiseState<FnType extends AsyncFn> {
  status: Status
  data?: ThenArg<ReturnType<FnType>>
  error?: any
  isInitial: boolean
  isPending: boolean
  isFulfilled: boolean
  isRejected: boolean
  isSettled: boolean
  fulfilledCount: number
  rejectedCount: number
  execute: (...args: Parameters<FnType>) => ReturnType<FnType>
}

interface InternalState<DataType> {
  status: Status
  data?: DataType
  error?: any
  fulfilledCount: number
  rejectedCount: number
}

const useAsync = <FnType extends AsyncFn>(
  asyncFn: FnType,
  options: UseAsyncOptions<ThenArg<ReturnType<FnType>>> = {}
): PromiseState<FnType> => {
  type DataType = ThenArg<ReturnType<FnType>>

  let defaultState: InternalState<DataType> = {
    status: Status.Pending,
    fulfilledCount: 0,
    rejectedCount: 0,
  }

  if (options.defaultData !== undefined) {
    defaultState.data = options.defaultData
  }

  const [state, setState] = useState(defaultState)

  const promiseRef = useRef<ReturnType<FnType>>()

  const execute = (...args: Parameters<FnType>): ReturnType<FnType> => {
    const promise = asyncFn(...args) as ReturnType<FnType>
    promiseRef.current = promise
    setState(prev => ({
      status: Status.Pending,
      data: prev.data,
      fulfilledCount: prev.fulfilledCount,
      rejectedCount: prev.rejectedCount,
    }))
    promise
      .then(data => {
        if (promiseRef.current !== promise) {
          return
        }
        setState(prev => ({
          status: Status.Fulfilled,
          data: options.mergeStrategy
            ? options.mergeStrategy(prev.data, data)
            : data,
          fulfilledCount: prev.fulfilledCount + 1,
          rejectedCount: prev.rejectedCount,
        }))
      })
      .catch(error => {
        if (promiseRef.current !== promise) {
          return
        }
        setState(prev => ({
          status: Status.Rejected,
          data: prev.data,
          error,
          fulfilledCount: prev.fulfilledCount,
          rejectedCount: prev.rejectedCount + 1,
        }))
      })
    return promise
  }

  const isInitial = state.status === Status.Initial
  const isPending = state.status === Status.Pending
  const isFulfilled = state.status === Status.Fulfilled
  const isRejected = state.status === Status.Rejected
  const isSettled = isFulfilled || isRejected

  return {
    ...state,
    isInitial,
    isPending,
    isFulfilled,
    isRejected,
    isSettled,
    execute,
  }
}

export default useAsync