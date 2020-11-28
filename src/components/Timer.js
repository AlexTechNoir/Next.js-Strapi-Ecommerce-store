import { useState, useEffect } from 'react'

export default function Timer() {
  const [ currentTime, setCurrentTime ] = useState(new Date().getTime())  
  const [ countdown, setCountdown ] = useState(null)
  const deadline = new Date(2021, 0, 0).getTime()

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
    <h1>
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
    </h1>
  )
}