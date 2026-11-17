import { useEffect, useRef, useState, type CSSProperties } from "react";
import avatarWebm from "@/assets/ali-avatar.webm";
// import avatarStacked from "@/assets/ali-avatar-stacked.mp4";

const frameClass = "absolute left-1/2 top-0 h-64 w-[160%] max-w-none -translate-x-[50%]";

const maskStyle: CSSProperties = {
  WebkitMaskImage:
    "radial-gradient(circle 128px at 50% 50%, #000 127px, transparent 128px), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000)",
  maskImage:
    "radial-gradient(circle 128px at 50% 50%, #000 127px, transparent 128px), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000)",
  WebkitMaskSize: "100% 100%, 100% 60%, 35% 100%, 36% 100%",
  maskSize: "100% 100%, 100% 60%, 35% 100%, 36% 100%",
  WebkitMaskPosition: "center, top, left, right",
  maskPosition: "center, top, left, right",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

export function AvatarVideo() {
  // const [safari, setSafari] = useState(false);

  // useEffect(() => {
  //   setSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  // }, []);

  // useEffect(() => {
  //   const ua = navigator.userAgent;
  //   const ios =
  //     /iPad|iPhone|iPod/.test(ua) ||
  //     (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  //   const forced = new URLSearchParams(window.location.search).has("stacked");
  //   setSafari(forced || ios || /^((?!chrome|android).)*safari/i.test(ua));
  // }, []);

  // if (safari) return <StackedAlphaVideo src={avatarStacked} />;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className={`${frameClass} object-contain`}
      style={maskStyle}
    >
      <source src={avatarWebm} type="video/webm" />
    </video>
  );
}

function StackedAlphaVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const v = videoRef.current!;
    const c = canvasRef.current!;
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    v.muted = true;
    v.defaultMuted = true;
    const play = () => v.play().catch(() => {});
    play();
    window.addEventListener("touchstart", play, { once: true, passive: true });
    let raf = 0;

    const draw = () => {
      const w = v.videoWidth;
      const h = v.videoHeight / 2;
      if (w && h && v.readyState >= 2) {
        if (c.width !== w) {
          c.width = w;
          c.height = h;
        }
        ctx.drawImage(v, 0, h, w, h, 0, 0, w, h);
        const mask = ctx.getImageData(0, 0, w, h);
        ctx.drawImage(v, 0, 0, w, h, 0, 0, w, h);
        const frame = ctx.getImageData(0, 0, w, h);
        for (let i = 0; i < frame.data.length; i += 4) frame.data[i + 3] = mask.data[i]!;
        ctx.putImageData(frame, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("touchstart", play);
    };
  }, []);

  return (
    <div className={frameClass} style={maskStyle}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.01]"
      />
      <canvas ref={canvasRef} className="relative h-full w-full object-contain" />
    </div>
  );
}
