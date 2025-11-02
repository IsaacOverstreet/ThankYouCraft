"use client";
import { useEffect, useState } from "react";
import SearchAndImageGrid from "../components/SearchAndImagePanel";
import { searchImage, UnsplashImage } from "@/lib/unsplash";
import { toast } from "react-toastify";
import { Sparkles } from "lucide-react";
import PersonaliseDetails from "../components/PersonalisationInfo";
import PreviewCard from "@/components/PreviewCard";

export default function Home() {
  const [image, setImage] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    null
  );
  const [userName, setUserName] = useState("");
  const [fontFamily, setFontFamily] = useState("Georgia, serif");
  const [fontColor, setFontColor] = useState("#FFFFFF");

  async function fetchImages(searchQuery: string, page: number) {
    try {
      setLoading(true);
      const data = await searchImage(searchQuery, page);
      setImage(data.results);
      setCurrentPage(page);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col bg-linear-to-br from-purple-50 via-blue-50 to-indigo-50 w-full min-h-screen items-center px-4 sm:px-6 lg:px-28 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col items-center h-[20%] mb-16">
        <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent text-center">
          Thank You Card Creator
        </h3>
        <p className="text-lg text-center sm:text-xl text-indigo-700 max-w-2xl mx-auto leading-relaxed mt-4">
          Choose an image, add your name, and create your personalized Thank You
          card.
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* Image Selection */}
        <div className="w-full lg:w-1/2">
          <section className="rounded-xl p-4 bg-white shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-indigo-800 mb-6">
              Choose Your Image
            </h2>
            <SearchAndImageGrid
              image={image}
              loading={loading}
              onSearch={fetchImages}
              currentPage={currentPage}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
            />
          </section>
        </div>

        {/* Personalization & Preview */}
        {selectedImage ? (
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <section className="rounded-xl p-4 bg-white shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-indigo-800 mb-6">
                Personalize Your Card
              </h2>
              <PersonaliseDetails
                userName={userName}
                fontFamily={fontFamily}
                fontColor={fontColor}
                onUserNameChange={setUserName}
                onFontFamilyChange={setFontFamily}
                onFontColorChange={setFontColor}
              />
            </section>

            <section className="rounded-xl p-4 bg-white shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-indigo-800 mb-6">
                Preview & Download
              </h2>
              <PreviewCard
                image={selectedImage}
                userName={userName}
                fontFamily={fontFamily}
                fontColor={fontColor}
              />
            </section>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center mt-6 lg:mt-0 border border-red-800 max-h-[400px] flex justify-center">
            <div className="max-w-md mx-auto  my-auto">
              <div className="w-24 h-24 bg-linear-to-br from-purple-200 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold text-indigo-800 mb-3">
                Get Started
              </h3>
              <p className="text-indigo-700 text-lg">
                Select an image from the grid to begin creating your
                personalized Thank You card.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
