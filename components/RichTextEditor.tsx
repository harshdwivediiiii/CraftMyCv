import React, { useState } from "react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
} from "react-simple-wysiwyg";
import { Loader, Sparkles } from "lucide-react";
import { AIChatSession } from "@/lib/google-ai-model";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

// Define the prompt template
const PROMPT = `Given the job title "{jobTitle}",
 create 6-7 concise and personal bullet points in
  HTML stringify format that highlight my key
  skills, relevant technologies, and significant
   contributions in that role. Do not include
    the job title itself in the output. Provide
     only the bullet points inside an unordered
     list.`;

// Type for the component props
interface RichTextEditorProps {
  jobTitle: string | null;
  initialValue: string;
  onEditorChange: (value: string) => void;
}

// Define a custom event type for ContentEditable (compatible with your use case)
type ContentEditableEvent = React.SyntheticEvent<{
  target: HTMLDivElement;
}>;

const RichTextEditor: React.FC<RichTextEditorProps> = ({ jobTitle, initialValue, onEditorChange }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialValue || "");

  // Generate summary from AI
  const GenerateSummaryFromAI = async () => {
    if (!jobTitle) {
      toast.error("Must provide Job Position");
      return;
    }

    setLoading(true);
    try {
      const prompt = PROMPT.replace("{jobTitle}", jobTitle);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();

      // Assuming the response is a valid JSON array
      const validJsonArray = JSON.parse(`[${responseText}]`);
      const summary = validJsonArray?.[0] || "";

      setValue(summary);
      onEditorChange(summary); // Pass the new value back
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  // Handle editor content change with the correct event type
  const handleEditorChange = (event: ContentEditableEvent) => {
    // Cast the event target to HTMLDivElement to access innerHTML
    const newValue = (event.target as HTMLDivElement).innerHTML;  // Type assertion
    setValue(newValue);
    onEditorChange(newValue); // Pass the new value back
  };

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <Label>Work Summary</Label>
        <Button
          variant="outline"
          type="button"
          className="gap-1"
          disabled={loading}
          onClick={GenerateSummaryFromAI}
        >
          <Sparkles size="15px" className="text-purple-500" />
          Generate with AI
          {loading && <Loader size="13px" className="animate-spin" />}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          containerProps={{
            style: {
              resize: "vertical",
              lineHeight: 1.2,
              fontSize: "13.5px",
            },
          }}
          onChange={handleEditorChange} // Correctly handle editor change
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
