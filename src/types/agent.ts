export interface AgentResponseContent {
  professional: string;
  casual: string;
  humorous: string;
  concise: string;
  style?: {
    summary?: string;
    bullets?: string[];
    steps?: string[];
    quip?: string;
    definition?: {
      term: string;
      definition: string;
      example: string;
    };
    qa?: {
      question: string;
      answer: string;
    };
  };
}

export interface ConversationStep {
  id: string;
  agentQuestion: string | AgentResponseContent;
  expectedUserInputs?: {
    keyword: string;
    nextStepId: string;
  }[];
  defaultNextStepId?: string;
  isContentGenerationStep?: boolean;
  responseGenerator?: (
    options: {
      tone: string;
      length: number;
      includeOutline: boolean;
      replyStyle?: string;
    },
    topic: string,
    hasAttachedFiles: boolean
  ) => string | string[] | Record<string, unknown>;
  replyStyle?: string;
}
