import { useRef, useState } from "react";
import { UnsplashImage } from "@/lib/unsplash";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

/**
 * Draws the personalized thank you card on a canvas
 * @param image - Selected image from Unsplash
 * @param userName - User's name
 * @param fontFamily - Font family for text
 * @param fontColor - Color of the text
 */

interface CardPreviewProps {
  image: UnsplashImage;
  userName: string;
  fontFamily: string;
  fontColor: string;
}

export default function CardPreview({
  image,
  userName,
  fontFamily,
  fontColor,
}: CardPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloading, setDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    // ✅ Ignore double-clicks
    if (downloading) return;
    setDownloading(true);

    try {
      // Pre-load image with better error handling
      const browserImage = new window.Image();
      browserImage.crossOrigin = "anonymous";

      const imageLoadPromise = new Promise<HTMLImageElement>(
        (resolve, reject) => {
          browserImage.onload = () => resolve(browserImage);
          browserImage.onerror = () =>
            reject(new Error("Failed to load image"));
          setTimeout(() => reject(new Error("Image load timeout")), 30000);
        }
      );

      browserImage.src =
        image.cover_photo.urls.regular || image.cover_photo.urls.full;

      const loadedImage = await imageLoadPromise;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { alpha: false });

      if (!ctx) throw new Error("Canvas context not available");

      canvas.width = 1200;
      canvas.height = 1500;

      ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 4;
      ctx.fillStyle = fontColor;

      ctx.font = `bold 180px ${fontFamily}`;
      ctx.strokeText("Thank You", canvas.width / 2, 300);
      ctx.fillText("Thank You", canvas.width / 2, 300);

      if (userName.trim()) {
        ctx.font = `600 100px ${fontFamily}`;
        ctx.strokeText(userName, canvas.width / 2, canvas.height - 200);
        ctx.fillText(userName, canvas.width / 2, canvas.height - 200);
      }

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Blob creation failed"))),
          "image/png",
          1.0
        );
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `thank-you-card-${Date.now()}.png`;
      a.style.display = "none";
      document.body.appendChild(a);

      await new Promise((resolve) => setTimeout(resolve, 100));
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden shadow-2xl mb-6">
        <Image
          src={image.cover_photo.urls.full}
          alt={image.cover_photo.alt_description || "Selected image"}
          className="w-full h-full object-cover"
          fill
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-between py-12 px-6">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-center drop-shadow-lg"
            style={{ fontFamily, color: fontColor }}
          >
            Thank You
          </h2>
          {userName.trim() && (
            <p
              className="text-3xl md:text-4xl font-semibold text-center drop-shadow-lg"
              style={{ fontFamily, color: fontColor }}
            >
              {userName}
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={handleDownload}
        size="lg"
        disabled={downloading}
        className="w-full h-14 text-lg active:scale-105  rounded-xl bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Download className="mr-2 h-5 w-5" />
        {downloading ? "Downloading..." : "Download Card"}
      </Button>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
