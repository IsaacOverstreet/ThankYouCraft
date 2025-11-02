import axios from "axios";
import { toast } from "react-toastify";

/**
 * Represents an image fetched from Unsplash
 */
export interface UnsplashImage {
  id: string;
  cover_photo: {
    id: string;
    alt_description: string | null;
    urls: {
      regular: string;
      small: string;
      full: string;
    };
  };
}

interface SearchResponse {
  results: UnsplashImage[];
  page: number;
  perPage: number;
}

/**
 * Fetches images from Unsplash based on a search query.
 * @param query - Search term (e.g., 'office', 'nature')
 * @param page - Page number for pagination
 * @param perPage - Number of images per page
 * @returns A Promise resolving to search results
 */

export async function searchImage(
  query: string,
  page: number = 1,
  perPage: number = 4
): Promise<SearchResponse> {
  try {
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      toast.error(
        "Access key is missing! Please check your environment variables."
      );
      return { results: [], page: 0, perPage: 0 };
    }

    const response = await axios.get(
      "https://api.unsplash.com/search/collections",
      {
        params: {
          query,
          page,
          per_page: perPage,
          client_id: accessKey,
        },
      }
    );
    const results = response.data;

    return results;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch images. Please try again.");
    return { results: [], page: 0, perPage: 0 };
  }
}

/**
 * Options for fonts in the personalization panel
 */
export const fontOptions = [
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Playfair Display, serif", label: "Playfair Display" },
  { value: "Montserrat, sans-serif", label: "Montserrat" },
  { value: "Lora, serif", label: "Lora" },
  { value: "Raleway, sans-serif", label: "Raleway" },
  { value: "Crimson Text, serif", label: "Crimson Text" },
];
