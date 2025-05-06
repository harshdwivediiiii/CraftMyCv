import React, { useCallback, useEffect, useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { INITIAL_THEME_COLOR } from "@/constant/colors";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette, ChevronDown } from "lucide-react";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "sonner";
import useDebounce from "@/hooks/use-debounce";

const ThemeColor = () => {
  const colors = [
    "#FF6F61", // Warm Coral
    "#33B679", // Fresh Green
    "#4B9CD3", // Soft Blue
    "#FF6F91", // Bright Magenta
    "#9B59B6", // Rich Purple
    "#1ABC9C", // Mint Green
    "#FF8C00", // Tangerine Orange
    "#B2D300", // Vibrant Lime
    "#8E44AD", // Deep Violet
    "#FF4F81", // Hot Pink
    "#2ECC71", // Light Jade
    "#3498DB", // Calm Sky Blue
    "#A3D550", // Neon Yellow-Green
    "#00BFFF", // Cool Azure
    "#FF6F61", // Coral Orange
    "#8E44AD", // Royal Blue
    "#2ECC71", // Electric Green
    "#5B2C6F", // Indigo Purple
    "#FF4F81", // Crimson Red
    "#2980B9", // Cobalt Blue
    "#F1C40F", // Sunflower Yellow
    "#E74C3C", // Alizarin Crimson
    "#C0392B", // Pomegranate Red
    "#9B59B6", // Amethyst Purple
    "#34495E", // Midnight Blue
    "#00CED1", // Dark Turquoise
  "#7FFF00", // Chartreuse
  "#FF1493", // Deep Pink
  "#FFD700", // Gold
  "#ADFF2F", // Green Yellow
  "#20B2AA", // Light Sea Green
  "#DC143C", // Crimson
  "#00FA9A", // Medium Spring Green
  "#6A5ACD", // Slate Blue
  "#D2691E", // Chocolate
  "#DA70D6", // Orchid
  "#FF4500", // Orange Red
  "#48D1CC", // Medium Turquoise
  "#FFA07A", // Light Salmon
  "#40E0D0", // Turquoise
  "#CD5C5C", // Indian Red
  "#DDA0DD", // Plum
  "#00FF7F", // Spring Green
  "#4169E1", // Royal Blue
  "#BA55D3", // Medium Orchid
  "#B22222", // Firebrick
  "#1E90FF", // Dodger Blue
  "#F08080", // Light Coral
  "#9932CC", // Dark Orchid
  "#3CB371", // Medium Sea Green
  "#FFA500", // Orange
  "#BDB76B", // Dark Khaki
  "#F0E68C", // Khaki
  "#8FBC8F", // Dark Sea Green
  "#A0522D", // Sienna
  "#9370DB", // Medium Purple
  "#66CDAA", // Medium Aquamarine
  "#FFB6C1", // Light Pink
  "#6B8E23", // Olive Drab
  "#8B0000", // Dark Red
  "#FF69B4", // Hot Pink
  "#00FF00", // Lime
  "#7B68EE", // Medium Slate Blue
  "#BC8F8F", // Rosy Brown
  "#8A2BE2", // Blue Violet
  "#228B22", // Forest Green
  "#DAA520", // Goldenrod
  "#DB7093", // Pale Violet Red
  "#008080", // Teal
  "#AFEEEE", // Pale Turquoise
  "#800000", // Maroon
  "#9ACD32", // Yellow Green
  "#A9A9A9", // Dark Gray
  "#B0E0E6", // Powder Blue
  ];

  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync } = useUpdateDocument();

  const [selectedColor, setSelectedColor] = useState(INITIAL_THEME_COLOR);

  const debouncedColor = useDebounce<string>(selectedColor, 1000);

  useEffect(() => {
    if (debouncedColor) onSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedColor]);

  const onColorSelect = useCallback(
    (color: string) => {
      setSelectedColor(color);

      if (!resumeInfo) return;
      onUpdate({
        ...resumeInfo,
        themeColor: color,
      });
    },
    [resumeInfo, onUpdate]
  );

  const onSave = useCallback(async () => {
    if (!selectedColor) return;
    if (selectedColor === INITIAL_THEME_COLOR) return;
    const thumbnail = await generateThumbnail();

    await mutateAsync(
      {
        themeColor: selectedColor,
        thumbnail: thumbnail,
      },
      {
        onSuccess: () => {
          toast.success("Theme updated successfully");
        },
        onError: () => {
          toast.error("Failed to update theme");
        },
      }
    );
  }, [mutateAsync, selectedColor]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={resumeInfo?.status === "archived" ? true : false}
          variant="secondary"
          className="bg-white border gap-1
                   dark:bg-gray-800 !p-2
                    lg:w-auto lg:p-4"
        >
          <div className="flex items-center gap-1">
            <Palette size="17px" />
            <span className="hidden lg:flex">Theme</span>
          </div>
          <ChevronDown size="14px" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="
          bg-background
          "
      >
        <h2
          className="mb-2 
                text-sm font-bold"
        >
          Select Theme Color
        </h2>

        <div className="grid grid-cols-5 gap-3">
          {colors.map((item: string, index: number) => (
            <div
              role="button"
              key={index}
              onClick={() => onColorSelect(item)}
              className={`h-5 w-8 rounded-[5px]
                            hover:border-black border

                          ${selectedColor === item && "border border-black"}
                            `}
              style={{
                background: item,
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;
