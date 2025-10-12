import { AgentResponseContent, ConversationStep } from '@/types/agent';
import { Message, ReplyStyle } from '@/types/chat';
import { contentResponseGenerator } from '@/lib/data/contentGenerator';
import {
  formatResponse,
  determineNextStepId,
  responseToString,
  initializeConversation,
  getStepById,
} from '@/lib/chat/utils';

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

  const initializationResult = initializeConversation(currentAgentStateId);
  if (initializationResult) {
    return {
      responseText: initializationResult.response,
      nextAgentStateId: initializationResult.nextId,
    };
  }
  const stepBeforeUserInput = getStepById(currentAgentStateId)!;
  const nextAgentStateId = determineNextStepId(userText, stepBeforeUserInput);
  if (currentAgentStateId === 'askTopic') {
    localStorage.setItem('topic', userText);
  }
  const nextStep = getStepById(nextAgentStateId);
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

  if (nextStep.isContentGenerationStep) {
    const topicToUse = localStorage.getItem('topic') ?? '';

    const generated = contentResponseGenerator(
      options,
      topicToUse,
      hasAttachedFiles
    );
    agentResponseText = responseToString(generated);
    localStorage.removeItem('topic');
  } else if (typeof nextStep.agentQuestion === 'string') {
    agentResponseText = nextStep.agentQuestion;
  } else {
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
