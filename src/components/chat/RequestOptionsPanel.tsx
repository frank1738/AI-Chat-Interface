import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CustomSelect } from './composer/CustomSelect';
import {
  TONE_OPTIONS,
  REPLY_STYLES,
  RESPONSE_LENGTH_LABELS,
} from '@/lib/chat/utils';

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

export function RequestOptionsPanel({
  onOptionsChange,
  DEFAULT_OPTIONS,
}: RequestOptionsPanelProps) {
  const [options, setOptions] = useState<RequestOptions>(DEFAULT_OPTIONS);

  const handleToneChange = (tone: string) => {
    const updated = { ...options, tone: tone as RequestOptions['tone'] };
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

  const handleResponseLengthChange = (values: number[]) => {
    const updated = { ...options, responseLength: values[0] };
    setOptions(updated);
    onOptionsChange?.(updated);
  };

  const handleIncludeOutlineChange = (checked: boolean) => {
    const updated = { ...options, includeOutline: checked };
    setOptions(updated);
    onOptionsChange?.(updated);
  };

  return (
    <div className="space-y-6">
      <CustomSelect
        id="tone-select"
        label="Tone"
        placeholder="Select tone"
        value={options.tone}
        onValueChange={handleToneChange}
        options={TONE_OPTIONS.map((tone) => ({ value: tone, label: tone }))}
      />

      <CustomSelect
        id="reply-style-select"
        label="Reply Style"
        placeholder="Select reply style"
        value={options.replyStyle}
        onValueChange={handleReplyStyleChange}
        options={REPLY_STYLES.map((style) => ({
          value: style.value,
          label: style.label,
        }))}
      />

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
          className="w-full "
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
