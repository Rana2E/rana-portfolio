import { useCallback, useEffect, useRef, useState } from 'react'

const copyWithFallback = async (text) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()

  const succeeded = document.execCommand('copy')
  document.body.removeChild(textarea)

  if (!succeeded) {
    throw new Error('Copy command was rejected')
  }
}

const useClipboard = (resetMs = 2000) => {
  const [status, setStatus] = useState('idle')
  const timeoutRef = useRef(null)

  const clearTimer = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const copy = useCallback(async (value) => {
    clearTimer()
    setStatus('idle')

    try {
      await copyWithFallback(value)
      setStatus('copied')
      timeoutRef.current = window.setTimeout(() => {
        setStatus('idle')
      }, resetMs)
      return true
    } catch {
      setStatus('error')
      timeoutRef.current = window.setTimeout(() => {
        setStatus('idle')
      }, resetMs)
      return false
    }
  }, [resetMs])

  useEffect(() => () => clearTimer(), [])

  return {
    copy,
    status,
    copied: status === 'copied',
    error: status === 'error',
  }
}

export default useClipboard
