// src/services/agentService.ts

import {
  conversationFlow,
  ConversationStep,
  AgentResponseContent,
} from '@/lib/chat/conversationFlow';
import { Message, ReplyStyle } from '@/types/chat';

function formatResponse(
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

function getCurrentStep(
  currentAgentStateId: string
): ConversationStep | undefined {
  return conversationFlow.find((step) => step.id === currentAgentStateId);
}

function normalizeInput(input: string): string {
  return input.toLowerCase().trim();
}

// Helper to convert any response to string
function responseToString(response: unknown): string {
  if (typeof response === 'string') return response;
  if (Array.isArray(response)) return response.join('\n');
  if (response && typeof response === 'object') {
    return JSON.stringify(response);
  }
  return String(response);
}

export function getAgentResponse(
  userMessage: Pick<Message, 'text' | 'replyStyle'> & {
    tone: string;
    length: number;
    includeOutline: boolean;
    hasAttachedFiles: boolean;
  },
  currentAgentStateId: string
): { responseText: string; nextAgentStateId: string } {
  const {
    text: userText,
    tone,
    length,
    includeOutline,
    hasAttachedFiles,
    replyStyle,
  } = userMessage;

  const stepBeforeUserInput = getCurrentStep(currentAgentStateId);

  if (!stepBeforeUserInput) {
    console.error(
      `AgentService: Could not find current conversation step for ID: ${currentAgentStateId}. Resetting to start.`
    );
    const startStep = getCurrentStep('start')!;
    const startQuestion =
      typeof startStep.agentQuestion === 'string'
        ? startStep.agentQuestion
        : (startStep.agentQuestion as AgentResponseContent)['professional'];
    return {
      responseText: startQuestion,
      nextAgentStateId: 'start',
    };
  }

  let nextAgentStateId: string;

  // --- Determine the *next* state ID based on the user's input and the *current* step's expectations ---
  const normalizedUserText = normalizeInput(userText);
  let matchedNextStepId: string | undefined;

  if (
    stepBeforeUserInput.expectedUserInputs &&
    stepBeforeUserInput.expectedUserInputs.length > 0
  ) {
    const matchedInput = stepBeforeUserInput.expectedUserInputs.find((input) =>
      normalizedUserText.includes(normalizeInput(input.keyword))
    );
    if (matchedInput) {
      matchedNextStepId = matchedInput.nextStepId;
    }
  }

  // If no keyword match but a defaultNextStepId is defined, use it.
  // This is especially important for 'askTopic' where any input is considered a topic.
  if (matchedNextStepId) {
    nextAgentStateId = matchedNextStepId;
  } else if (stepBeforeUserInput.defaultNextStepId) {
    nextAgentStateId = stepBeforeUserInput.defaultNextStepId;
  } else {
    nextAgentStateId = 'start'; // Fallback to start for robustness
  }

  // If the *current* step was 'askTopic', then the user's input *is* the topic.
  // We need to store this to pass to the 'generateContent' step's responseGenerator.
  if (currentAgentStateId === 'askTopic') {
    localStorage.setItem('topic', userText);
  }

  // --- Now, get the actual *response text* for this determined `nextAgentStateId` ---
  const nextStep = getCurrentStep(nextAgentStateId);

  if (!nextStep) {
    console.error(
      `AgentService: Could not find next conversation step for ID: ${nextAgentStateId}.`
    );
    return {
      responseText:
        "I'm having trouble continuing our conversation. Let's restart.",
      nextAgentStateId: 'start',
    };
  }

  let agentResponseText: string = '';
  const options = {
    tone,
    length,
    includeOutline,
    replyStyle: replyStyle || nextStep.replyStyle,
  };

  if (nextStep.responseGenerator) {
    const topicToUse = localStorage.getItem('topic') ?? '';
    const generated = nextStep.responseGenerator(
      options,
      topicToUse,
      hasAttachedFiles
    );
    agentResponseText = responseToString(generated);
    localStorage.removeItem('topic');
  } else if (typeof nextStep.agentQuestion === 'string') {
    agentResponseText = nextStep.agentQuestion;
  } else {
    // Use the formatResponse helper to handle different styles and tones
    agentResponseText = formatResponse(
      nextStep.agentQuestion as AgentResponseContent,
      tone,
      (replyStyle || nextStep.replyStyle) as ReplyStyle | undefined
    );
  }

  return {
    responseText: agentResponseText,
    nextAgentStateId,
  };
}
