import React, { useEffect, useRef } from 'react'

export default function Video(props: { srcObject: any }) {
    const refVideo = useRef<HTMLVideoElement>(null)
    const srcObject = props.srcObject
  useEffect(() => {
    if (!refVideo.current) return
    refVideo.current.srcObject = srcObject
  }, [srcObject])

  return <video ref={refVideo} autoPlay muted/>
}
