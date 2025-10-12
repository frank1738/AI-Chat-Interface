import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export interface RequestOptions {
  tone: 'Professional' | 'Casual' | 'Humorous' | 'Concise';
  responseLength: number;
  includeOutline: boolean;
  replyStyle?: 'summary' | 'bullets' | 'steps' | 'quip' | 'definition' | 'qa';
}

interface RequestOptionsPanelProps {
  onClose?: () => void;
  onOptionsChange?: (options: RequestOptions) => void;
  DEFAULT_OPTIONS: RequestOptions;
}

const TONE_OPTIONS = ['Professional', 'Casual', 'Humorous', 'Concise'] as const;
const REPLY_STYLES = [
  { value: 'summary', label: 'Summary Paragraph' },
  { value: 'bullets', label: 'Bullet Points' },
  { value: 'steps', label: 'Numbered Steps' },
  { value: 'quip', label: 'Short Quip' },
  { value: 'definition', label: 'Definition' },
  { value: 'qa', label: 'Q&A' },
] as const;
const RESPONSE_LENGTH_LABELS = [
  'Very Short',
  'Short',
  'Brief',
  'Medium',
  'Moderate',
  'Long',
  'Very Long',
  'Extended',
  'Detailed',
  'Comprehensive',
];

export function RequestOptionsPanel({
  onClose,
  onOptionsChange,
  DEFAULT_OPTIONS,
}: RequestOptionsPanelProps) {
  const [options, setOptions] = useState<RequestOptions>(DEFAULT_OPTIONS);

  const handleToneChange = (tone: string) => {
    const updated = {
      ...options,
      tone: tone as RequestOptions['tone'],
    };
    setOptions(updated);
    onOptionsChange?.(updated);
  };

  const handleResponseLengthChange = (values: number[]) => {
    const updated = {
      ...options,
      responseLength: values[0],
    };
    setOptions(updated);
    onOptionsChange?.(updated);
  };

  const handleIncludeOutlineChange = (checked: boolean) => {
    const updated = {
      ...options,
      includeOutline: checked,
    };
    setOptions(updated);
    onOptionsChange?.(updated);
  };

  const handleReplyStyleChange = (value: string) => {
    const updated = {
      ...options,
      replyStyle: value as RequestOptions['replyStyle'],
    };
    setOptions(updated);
    onOptionsChange?.(updated);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="tone-select"
          className="text-sm font-medium text-foreground"
        >
          Tone
        </Label>
        <Select value={options.tone} onValueChange={handleToneChange}>
          <SelectTrigger
            id="tone-select"
            className="w-full bg-card border-border text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
          >
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>

          <SelectContent className="bg-card border-border">
            {TONE_OPTIONS.map((tone) => (
              <SelectItem key={tone} value={tone} className="text-foreground">
                {tone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="tone-select"
          className="text-sm font-medium text-foreground"
        >
          Reply Style
        </Label>
        <Select
          value={options.replyStyle}
          onValueChange={handleReplyStyleChange}
        >
          <SelectTrigger
            id="tone-select"
            className="w-full bg-card border-border text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
          >
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>

          <SelectContent className="bg-card border-border">
            {REPLY_STYLES.map((style) => (
              <SelectItem
                key={style.value}
                value={style.value}
                className="text-foreground"
              >
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="response-length"
            className="text-sm font-medium text-foreground"
          >
            Response Length
          </Label>
          <span className="text-xs text-muted-foreground">
            {RESPONSE_LENGTH_LABELS[options.responseLength - 1]}
          </span>
        </div>
        <Slider
          id="response-length"
          min={1}
          max={10}
          step={1}
          value={[options.responseLength]}
          onValueChange={handleResponseLengthChange}
          className="w-full [&>[data-orientation=horizontal]>div:first-child]:bg-red-500"
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Short</span>
          <span>Long</span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
        <Label
          htmlFor="include-outline"
          className="text-sm font-medium text-foreground cursor-pointer"
        >
          Include Outline
        </Label>
        <Switch
          id="include-outline"
          checked={options.includeOutline}
          onCheckedChange={handleIncludeOutlineChange}
          className="bg-muted"
        />
      </div>
    </div>
  );
}
