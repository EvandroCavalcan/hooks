import {useEffect, useState} from 'react'
import {Clipboard} from 'react-native'

type Listener = (content: string) => void
const listeners = new Set<Listener>()

function setString(content: string) {
  Clipboard.setString(content)
  listeners.forEach((listener) => listener(content))
}

/**
 * @deprecated Please use "useClipboard" from "@react-native-clipboard/clipboard" instead
 * More: https://github.com/react-native-clipboard/clipboard#useclipboard
 */
export function useClipboard(): [string, (content: string) => void] {
  const [data, updateClipboardData] = useState('')

  // Get initial data
  useEffect(() => {
    Clipboard.getString().then(updateClipboardData)
  }, [])

  // Listen for updates
  useEffect(() => {
    listeners.add(updateClipboardData)

    return () => {
      listeners.delete(updateClipboardData)
    }
  }, [])

  return [data, setString]
}
