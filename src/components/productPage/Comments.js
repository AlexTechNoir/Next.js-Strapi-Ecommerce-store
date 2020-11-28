import { useEffect } from 'react'

export default function Comments() {
  useEffect(() => {
    window.FB.XFBML.parse()
  })
  
  return (
    <div>
      <div
        className="fb-comments"
        data-href={window.location.href}
        data-width="100%"
      ></div>
    </div>
  );
}