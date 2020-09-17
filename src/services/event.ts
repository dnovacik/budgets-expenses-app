import { NativeEventEmitter } from 'react-native'

const EventEmitter = new NativeEventEmitter()

let storeReady: boolean = false

export const onStoreReady = (): void => {
  storeReady = true

  emitStorageReady()
}

const emitStorageReady = (): void => {
  if (storeReady) {
    EventEmitter.emit('store-ready')
  }
}

export default EventEmitter