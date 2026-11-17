import { useEffect, useRef } from "react";

function BgVideo({
  mp4,
  webm,
  poster,
  className,
}: {
  mp4: string;
  webm?: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    const play = () => v.play().catch(() => {});
    play();
    window.addEventListener("touchstart", play, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", play);
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      className={className}
    >
      <source src={mp4} type="video/mp4" />
      {webm && <source src={webm} type="video/webm" />}
    </video>
  );
}

export default BgVideo;
