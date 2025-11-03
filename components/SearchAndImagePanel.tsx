import { ImageGridSkeleton } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UnsplashImage } from "@/lib/unsplash";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface imageProp {
  image: UnsplashImage[];
  loading: boolean;
  onSearch: (searchQuery: string, page: number) => void;
  currentPage: number;
  selectedImage: UnsplashImage | null;
  onSelectImage: (image: UnsplashImage) => void;
}

export default function SearchAndImageGrid({
  image,
  loading,
  onSearch,
  currentPage,
  selectedImage,
  onSelectImage,
}: imageProp) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim(), 1);
    }
  }

  function handlePrevious() {
    if (currentPage > 1 && searchQuery.trim()) {
      onSearch(searchQuery.trim(), currentPage - 1);
    }
  }

  function handleNext() {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim(), currentPage + 1);
    }
  }

  return (
    <div className="w-full ">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for images (e.g., nature, flowers, cars)..."
            className="pl-10 h-12 text-base rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <div className="w-full flex  gap-3.5 mb-3">
        {loading ? (
          <ImageGridSkeleton />
        ) : (
          <div className="w-full flex flex-wrap  justify-center gap-2.5 mb-3">
            {image.map((img) => (
              <Button
                onClick={() => onSelectImage(img)}
                key={img.id}
                className={`relative w-[47.9%] md:w-[48.6%] xl:w-[49%] sm:w-[48%] lg:h-[300px] md:h-[300px] h-[200px] group overflow-hidden rounded-xl transition-all duration-300 aspect-4/5 ${
                  selectedImage?.id === img.id
                    ? "ring-4 ring-blue-500 ring-offset-2 shadow-2xl scale-[1.02]"
                    : "hover:shadow-xl hover:scale-[1.02] ring-2 ring-gray-200"
                }`}
              >
                <Image
                  src={img.cover_photo.urls.regular}
                  alt={img.cover_photo.alt_description || "unsplash"}
                  className="w-full h-full object-cover"
                  fill
                />
              </Button>
            ))}
          </div>
        )}
      </div>

      {searchQuery.trim() && (
        <div className="flex items-center justify-center gap-4 py-6 w-full">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1 || loading}
            variant="outline"
            className="flex items-center gap-2  rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Prev</span>
          </Button>

          <span className="text-sm text-gray-600 font-medium px-4">
            Page{" "}
            <span className="font-semibold text-gray-800">{currentPage}</span>
          </span>

          <Button
            onClick={handleNext}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
