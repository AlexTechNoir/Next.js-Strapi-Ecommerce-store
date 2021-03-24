import { useEffect, useContext } from 'react'
import Context from '../../context'

export default function Comments() {
  const { areCookiesAccepted } = useContext(Context)
  
  useEffect(() => {
    if (areCookiesAccepted) {
      window.FB.XFBML.parse()
    }
  }, [areCookiesAccepted])
  
  return (
    <div>
      {
        areCookiesAccepted ? (
          <div
            className="fb-comments"
            data-href={window.location.href}
            data-width="100%"
          ></div>
        ) : (
          <div>User rejected cookies</div>
        )
      }
    </div>
  );
}