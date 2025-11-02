import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fontOptions } from "@/lib/unsplash";

/**
 * Panel that allows users to personalize their Thank You card
 */

interface PersonalizationPanelProps {
  userName: string;
  fontFamily: string;
  fontColor: string;
  onUserNameChange: (name: string) => void;
  onFontFamilyChange: (font: string) => void;
  onFontColorChange: (color: string) => void;
}

export default function PersonaliseDetails({
  userName,
  fontFamily,
  fontColor,
  onUserNameChange,
  onFontFamilyChange,
  onFontColorChange,
}: PersonalizationPanelProps) {
  return (
    <div className="border w-full p-4 sm:p-6 md:p-8 rounded-lg bg-white shadow-sm space-y-6">
      {/* Your Name */}
      <div className="w-full">
        <Label
          htmlFor="userName"
          className="text-base font-medium text-gray-700 mb-2 block"
        >
          Your Name
        </Label>
        <Input
          id="userName"
          type="text"
          placeholder="Enter your name..."
          value={userName}
          onChange={(e) => onUserNameChange(e.target.value)}
          className="h-12 w-full text-base rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Font Style */}
      <div className="w-full">
        <Label
          htmlFor="fontFamily"
          className="text-base font-medium text-gray-700 mb-2 block"
        >
          Font Style
        </Label>
        <Select value={fontFamily} onValueChange={onFontFamilyChange}>
          <SelectTrigger
            id="fontFamily"
            className="h-12 w-full text-base rounded-lg border-gray-200"
          >
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((font) => (
              <SelectItem
                key={font.value}
                value={font.value}
                className="text-base"
              >
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Text Color */}
      <div className="w-full">
        <Label
          htmlFor="fontColor"
          className="text-base font-medium text-gray-700 mb-2 block"
        >
          Text Color
        </Label>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            id="fontColor"
            type="color"
            value={fontColor}
            onChange={(e) => onFontColorChange(e.target.value)}
            className="h-12 w-20 rounded-lg border-2 border-gray-200 cursor-pointer"
          />
          <Input
            type="text"
            value={fontColor}
            onChange={(e) => onFontColorChange(e.target.value)}
            className="h-12 text-base rounded-lg border-gray-200 flex-1 w-full"
            placeholder="#FFFFFF"
          />
        </div>
      </div>
    </div>
  );
}
