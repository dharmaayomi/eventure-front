// CopyComponent.tsx
import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CopyComponentProps {
  textToCopy: string;
}

export default function CopyComponent({ textToCopy }: CopyComponentProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy); // Salin teks yang dikirim lewat props
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="disabled:opacity-100"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            disabled={copied}
          >
            <div
              className={`transition-all ${copied ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
            >
              <CheckIcon
                className="stroke-emerald-500"
                size={16}
                aria-hidden="true"
              />
            </div>
            <div
              className={`absolute transition-all ${copied ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
            >
              <CopyIcon size={16} aria-hidden="true" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          Click to copy
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
