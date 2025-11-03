export function ImageGridSkeleton() {
  return (
    <div className="w-full flex flex-wrap  justify-between gap-4 mb-3">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="relative w-[46.7%] md:w-[47.9%] sm:w-[48%] lg:h-[300px] md:h-[300px] h-[200px] rounded-xl overflow-hidden bg-gray-200 animate-pulse"
        >
          {/* shimmer overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent animate-[shimmer_1.5s_infinite]" />
        </div>
      ))}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
