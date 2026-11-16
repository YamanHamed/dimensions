import { useEffect, useRef, useState } from "react";
import avatarWebm from "@/assets/ali-avatar.webm";
import avatarStacked from "@/assets/ali-avatar-stacked.mp4";

function StackedAlphaVideo({ src, className }: { src: string; className?: string | undefined }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const v = videoRef.current!;
    const c = canvasRef.current!;
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    let raf = 0;

    const draw = () => {
      const w = v.videoWidth;
      const h = v.videoHeight / 2;
      if (w && h && v.readyState >= 2) {
        if (c.width !== w) {
          c.width = w;
          c.height = h;
        }
        ctx.drawImage(v, 0, h, w, h, 0, 0, w, h); // bottom half: mask
        const mask = ctx.getImageData(0, 0, w, h);
        ctx.drawImage(v, 0, 0, w, h, 0, 0, w, h); // top half: color
        const frame = ctx.getImageData(0, 0, w, h);
        for (let i = 0; i < frame.data.length; i += 4) {
          const maskValue = mask.data[i];
          if (maskValue !== undefined) {
            frame.data[i + 3] = maskValue; // mask brightness -> alpha
          }
        }
        ctx.putImageData(frame, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline

        className="absolute left-1/2 top-0 h-64 w-[160%] max-w-none -translate-x-[50%] object-contain"
        style={{
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
        }}
        // style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />
      <canvas ref={canvasRef} className={className} />
    </>
  );
}

export function AvatarVideo({ className }: { className?: string | undefined }) {
  const [safari, setSafari] = useState(false);

  useEffect(() => {
    // Safari on Mac, plus every browser on iPhone/iPad (they all use Safari's engine)
    setSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  if (safari) return <StackedAlphaVideo src={avatarStacked} className={className} />;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute left-1/2 top-0 h-64 w-[160%] max-w-none -translate-x-[50%] object-contain"
      style={{
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
      }}
    >
      <source src={avatarWebm} type="video/webm" />
    </video>
  );
}
