import { conversationFlow } from '@/lib/chat/conversationFlow';
import { AgentResponseContent, ConversationStep } from '@/types/agent';
import { ReplyStyle } from '@/types/chat';

export function formatLocalTime(timeString: string): string {
  const timestamp = Number(timeString);

  if (isNaN(timestamp)) {
    throw new Error('Invalid time string provided');
  }

  const date = new Date(timestamp);

  const formatted = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return formatted;
}

export const TONE_OPTIONS = [
  'Professional',
  'Casual',
  'Humorous',
  'Concise',
] as const;
export const REPLY_STYLES = [
  { value: 'summary', label: 'Summary Paragraph' },
  { value: 'bullets', label: 'Bullet Points' },
  { value: 'steps', label: 'Numbered Steps' },
  { value: 'quip', label: 'Short Quip' },
  { value: 'definition', label: 'Definition' },
  { value: 'qa', label: 'Q&A' },
] as const;
export const RESPONSE_LENGTH_LABELS = [
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

export function formatResponse(
  content: AgentResponseContent,
  tone: string,
  replyStyle?: ReplyStyle
): string {
  if (!replyStyle || !content.style?.[replyStyle]) {
    const toneKey = Object.keys(content).includes(tone)
      ? (tone as keyof AgentResponseContent)
      : 'professional';
    return content[toneKey] as string;
  }
}

export function getCurrentStep(
  currentAgentStateId: string
): ConversationStep | undefined {
  return conversationFlow.find((step) => step.id === currentAgentStateId);
}

export function normalizeInput(input: string): string {
  return input.toLowerCase().trim();
}

export function responseToString(response: unknown): string {
  if (typeof response === 'string') return response;
  if (Array.isArray(response)) return response.join('\n');
  if (response && typeof response === 'object') {
    return JSON.stringify(response);
  }
  return String(response);
}

export const getStepById = (stepId: string): ConversationStep | undefined => {
  return conversationFlow.find((step) => step.id === stepId);
};

export function determineNextStepId(
  userText: string,
  currentStep: ConversationStep
): string {
  const normalizedUserText = normalizeInput(userText);
  let matchedNextStepId: string | undefined;

  if (
    currentStep.expectedUserInputs &&
    currentStep.expectedUserInputs.length > 0
  ) {
    const matchedInput = currentStep.expectedUserInputs.find((input) =>
      normalizedUserText.includes(normalizeInput(input.keyword))
    );
    if (matchedInput) {
      matchedNextStepId = matchedInput.nextStepId;
    }
  }

  return matchedNextStepId || currentStep.defaultNextStepId || 'start';
}

export function initializeConversation(
  currentAgentStateId: string
): { step: ConversationStep; nextId: string; response: string } | null {
  const step = getStepById(currentAgentStateId);

  if (!step) {
    console.error(
      `AgentService: Could not find current conversation step for ID: ${currentAgentStateId}. Resetting to start.`
    );
    const startStep = getStepById('start')!;
    const startQuestion =
      typeof startStep.agentQuestion === 'string'
        ? startStep.agentQuestion
        : (startStep.agentQuestion as AgentResponseContent)['professional'];
    return {
      step: startStep,
      nextId: 'start',
      response: startQuestion,
    };
  }
  return null;
}
