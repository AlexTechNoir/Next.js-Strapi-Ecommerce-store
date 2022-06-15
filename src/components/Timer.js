import { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function Timer() {
  const [ currentTime, setCurrentTime ] = useState(new Date().getTime())  
  const [ countdown, setCountdown ] = useState(null)
  const deadline = new Date(new Date().getFullYear() + 1, 0, 0).getTime()

  let timeDifference = deadline - currentTime

  useEffect(() => {
    if (currentTime !== deadline) {
      setCountdown(setInterval(() => timer(), 1000))
    } else {
      return clearInterval(countdown)
    }

    return () => {
      clearInterval(countdown)
    }
  }, [])

  if (Math.sign(timeDifference) === -1) { 
    clearInterval(countdown)
  }

  function timer() {
    setCurrentTime(new Date().getTime())  
  }

  return (
    <TimerH1>
      <span> 
        <span>Offer ends in:</span>
        <span>
          { 
            Math.sign(timeDifference) !== -1
            ? (`${Math.floor(timeDifference / (1000 * 3600 * 24))} : 
                ${Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600))} : 
                ${Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60))} : 
                ${Math.floor((timeDifference % (1000 * 60)) / 1000)}`)
            : "0 : 0 : 0 : 0"
          }
        </span>
      </span>
    </TimerH1>
  )
}

const TimerH1 = styled.h1`
  margin: auto;
  > :first-child {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }
`