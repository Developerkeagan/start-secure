import { useEffect, useRef, useState } from "react";
import { Camera, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function FaceScan({ onCapture }: { onCapture: (dataUrl: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const start = async () => {
    try {
      setError(null);
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 480 },
      });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }
    } catch (e) {
      console.error(e);
      setError("Camera access denied. Please enable camera permissions and try again.");
    }
  };

  useEffect(() => {
    start();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capture = () => {
    if (!videoRef.current) return;
    setScanning(true);
    setTimeout(() => {
      const v = videoRef.current!;
      const canvas = document.createElement("canvas");
      canvas.width = v.videoWidth;
      canvas.height = v.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(v, 0, 0);
      const url = canvas.toDataURL("image/jpeg", 0.85);
      setPhoto(url);
      stream?.getTracks().forEach((t) => t.stop());
      setStream(null);
      setScanning(false);
      toast.success("Face captured successfully");
    }, 1500);
  };

  const retake = async () => {
    setPhoto(null);
    await start();
  };

  return (
    <div className="space-y-4">
      <div className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center overflow-hidden rounded-full border-4 border-primary/20 bg-muted">
        {photo ? (
          <img src={photo} alt="Captured face" className="h-full w-full object-cover" />
        ) : error ? (
          <div className="px-6 text-center text-sm text-muted-foreground">{error}</div>
        ) : (
          <>
            <video ref={videoRef} className="h-full w-full object-cover" muted playsInline />
            {scanning && (
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-1 animate-[scan_1.5s_ease-in-out] bg-[image:var(--gradient-primary)] shadow-[0_0_20px_var(--primary-glow)]" />
              </div>
            )}
          </>
        )}
        {photo && (
          <div className="absolute bottom-2 right-2 rounded-full bg-background p-1 shadow-md">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {photo
          ? "Looks great! Confirm to continue."
          : "Position your face inside the circle and stay still"}
      </p>

      <div className="flex gap-3">
        {photo ? (
          <>
            <Button type="button" variant="outline" size="xl" className="flex-1" onClick={retake}>
              <RefreshCw /> Retake
            </Button>
            <Button
              type="button"
              variant="hero"
              size="xl"
              className="flex-1"
              onClick={() => onCapture(photo)}
            >
              Confirm
            </Button>
          </>
        ) : error ? (
          <Button type="button" variant="hero" size="xl" className="w-full" onClick={start}>
            <Camera /> Enable Camera
          </Button>
        ) : (
          <Button
            type="button"
            variant="hero"
            size="xl"
            className="w-full"
            disabled={!stream || scanning}
            onClick={capture}
          >
            <Camera /> {scanning ? "Scanning..." : "Capture"}
          </Button>
        )}
      </div>

      <style>{`@keyframes scan { 0%{transform:translateY(0)} 50%{transform:translateY(280px)} 100%{transform:translateY(0)} }`}</style>
    </div>
  );
}
