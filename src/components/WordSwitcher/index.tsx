import { useEffect, useState } from 'react'

type WordSwitcherProps = {
  words: string[]
  mode?: 'inc' | 'dec'
  velocity?: number
  transitionDelay?: number
}

export default function WordSwitcher({
  transitionDelay = 2,
  mode = 'dec',
  velocity = 7,
  words,
}: WordSwitcherProps) {
  const [firstPlay, setFirstPlay] = useState(true)
  const [currentMode, setCurrentMode] =
    useState<WordSwitcherProps['mode']>(mode)
  const [currentWord, setCurrentWord] = useState(0)
  const [currentText, setCurrentText] = useState(
    currentMode === 'inc' ? '' : words[currentWord],
  )
  const [currentWordPosition, setCurrentWordPosition] = useState(0)

  useEffect(() => {
    if (currentMode === 'inc') {
      setTimeout(() => {
        if (currentWordPosition < words[currentWord].length) {
          const incText = words[currentWord].split('')[currentWordPosition]
          setCurrentText(() => currentText + incText)
          setCurrentWordPosition(() => currentWordPosition + 1)
        } else {
          setTimeout(() => {
            setCurrentWordPosition(() => 0)
            setCurrentMode('dec')
          }, transitionDelay * 1000)
        }
      }, velocity * 10)
    } else {
      setTimeout(
        () => {
          const letters = currentText.split('')

          if (letters.length > 0) {
            const lastLetterRemoved = letters
              .filter((_, i) => i !== letters.length - 1)
              .join('')

            setCurrentText(() => lastLetterRemoved)
          } else {
            const nextWord = words[currentWord + 1] ? currentWord + 1 : 0
            setCurrentWord(() => nextWord)
            setCurrentMode(() => 'inc')
          }
        },
        firstPlay ? transitionDelay * 1000 : velocity * 10,
      )
    }

    setFirstPlay(() => false)
  }, [currentText, currentMode])

  return <>{currentText}</>
}
