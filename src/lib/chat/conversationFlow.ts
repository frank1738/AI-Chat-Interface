// src/data/conversationFlow.ts

// Union of all possible response content types
type ResponseContent =
  | string // For simple text responses
  | string[] // For bullet points or steps
  | { term: string; definition: string; example: string } // For definitions
  | { question: string; answer: string }; // For Q&A

export interface AgentResponseContent {
  // Tone-based responses (existing)
  professional: string;
  casual: string;
  humorous: string;
  concise: string;

  // Style-based responses (new)
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

export const conversationFlow: ConversationStep[] = [
  {
    id: 'start',
    agentQuestion:
      "Welcome to our SEO content manager. Would you like to create content? (Type 'yes' or 'no')",
    expectedUserInputs: [
      { keyword: 'yes', nextStepId: 'askTopic' },
      { keyword: 'no', nextStepId: 'goodbye' },
    ],
    defaultNextStepId: 'start',
  },
  {
    id: 'askTopic',
    agentQuestion: {
      professional:
        "Please choose either 'ChatGPT' or 'SEO' as your content topic.",
      casual: "Pick a topic - 'ChatGPT' or 'SEO'?",
      humorous:
        "Let's talk about 'ChatGPT' or 'SEO' - your choice! (I'm great at both!)",
      concise: 'Topic? (ChatGPT or SEO)',
    },
    expectedUserInputs: [
      {
        keyword: 'chatgpt',
        nextStepId: 'askFileUpload',
      },
      {
        keyword: 'seo',
        nextStepId: 'askFileUpload',
      },
    ],
    defaultNextStepId: 'askTopic',
  },
  {
    id: 'askFileUpload',
    agentQuestion: {
      professional:
        "Would you like to upload any reference files to help with content generation? (Type 'yes' or 'no')",
      casual:
        "Got it! Do you have any files you'd like to throw at me? (yes/no)",
      humorous:
        'Splendid! Do you have any mystical scrolls—er, files—to attach? (yes/no)',
      concise: 'Attach files? (yes/no)',
    },
    expectedUserInputs: [
      { keyword: 'yes', nextStepId: 'fileUpload' },
      { keyword: 'no', nextStepId: 'generateContent' },
    ],
    defaultNextStepId: 'generateContent',
  },
  {
    id: 'fileUpload',
    agentQuestion: {
      professional:
        "Please upload your reference file(s). Once uploaded, I'll use them to enhance your content generation.",
      casual:
        "Go ahead and drop your file(s) here. I'll weave them into the content magic!",
      humorous:
        'Behold! Cast your files into the digital abyss, and I shall transmute them into content glory!',
      concise: 'Upload file(s) now.',
    },
    defaultNextStepId: 'generateContent',
  },
  {
    id: 'generateContent',
    agentQuestion: '',
    responseGenerator: (options, topic, hasAttachedFiles) => {
      const { replyStyle = 'summary', length = 5 } = options;
      const isChatGPT = topic.toLowerCase() === 'chatgpt';
      const includeOtline = options.includeOutline;

      // Define length thresholds (1-10 scale)
      const isShort = length <= 3;
      const isMedium = length > 3 && length <= 7;
      const isLong = length > 7;

      const content = {
        chatgpt: {
          title: 'ChatGPT',
          description:
            '**ChatGPT** is an AI language model developed by OpenAI that can understand and generate human-like text.',
          descriptionShort: '**ChatGPT** is an AI language model by OpenAI.',
          features: [
            'Uses **GPT architecture** for natural language understanding',
            'Can generate human-like text based on prompts',
            'Use `prompt engineering` for better results',
            'Supports multiple languages and domains',
          ],
          featuresBrief: [
            'Uses **GPT architecture**',
            'Generates human-like text',
          ],
          example:
            'response = chatgpt.generate("Hello, world!")\nprint(response)',
          link: 'https://openai.com/chatgpt',
          linkText: 'OpenAI',
          exampleLanguage: 'python',
        },
        seo: {
          title: 'SEO',
          description:
            '**SEO** (Search Engine Optimization) improves website visibility in search engine results.',
          descriptionShort:
            '**SEO** improves website visibility in search results.',
          features: [
            '**Keywords** help search engines understand content',
            'Meta descriptions and title tags are crucial for click-through rates',
            'Use `semantic HTML` for better crawling and accessibility',
            'Build quality backlinks to improve domain authority',
          ],
          featuresBrief: [
            '**Keywords** improve visibility',
            'Meta tags increase click-through rates',
          ],
          example:
            '<meta name="description" content="Learn about SEO best practices for better search visibility">',
          link: 'https://developers.google.com/search/docs',
          linkText: 'Google SEO Guide',
          exampleLanguage: 'html',
        },
      };

      const topicData = isChatGPT ? content.chatgpt : content.seo;

      const getDescription = () =>
        isShort ? topicData.descriptionShort : topicData.description;
      const getFeatures = () =>
        isShort ? topicData.featuresBrief : topicData.features;

      const fileNote = hasAttachedFiles
        ? ' *Generated with your reference files in mind.*'
        : '';

      switch (replyStyle) {
        case 'bullets':
          if (isShort) {
            return [
              `## ${topicData.title}`,
              getDescription(),
              '',
              '### Key Features',
              ...getFeatures().map((f) => `- ${f}`),
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          } else if (isMedium) {
            return [
              `## ${topicData.title}`,
              getDescription(),
              '',
              '### Key Features',
              ...getFeatures().map((f) => `- ${f}`),
              '',
              '### Example',
              `\`\`\`${topicData.exampleLanguage}`,
              topicData.example,
              '```',
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          } else {
            return [
              `## ${topicData.title}`,
              getDescription(),
              '',
              '### Key Features',
              ...getFeatures().map((f) => `- ${f}`),
              '',
              '### Example',
              `\`\`\`${topicData.exampleLanguage}`,
              topicData.example,
              '```',
              `[${topicData.linkText}](${topicData.link})`,
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          }

        case 'steps':
          if (isShort) {
            return [
              `# ${topicData.title}`,
              getDescription(),
              '',
              '## Getting Started',
              `1. ${getFeatures()[0]}`,
              `2. ${getFeatures()[1]}`,
              `3. ${getFeatures()[2] || 'Continue learning'}`,
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          } else if (isMedium) {
            return [
              `# ${topicData.title}`,
              getDescription(),
              '',
              '## Getting Started',
              `1. **Understand the basics**: ${getFeatures()[0]}`,
              `2. **Learn the fundamentals**: ${getFeatures()[1]}`,
              `3. **Apply best practices**: ${getFeatures()[2]}`,
              '',
              '## Example',
              `\`\`\`${topicData.exampleLanguage}`,
              topicData.example,
              '```',
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          } else {
            return [
              `# ${topicData.title}`,
              getDescription(),
              '',
              '## Getting Started',
              `1. **Understand the basics**: ${getFeatures()[0]}`,
              `2. **Learn the fundamentals**: ${getFeatures()[1]}`,
              `3. **Apply best practices**: ${getFeatures()[2]}`,
              `4. **Master advanced concepts**: ${
                getFeatures()[3] || 'Explore advanced techniques'
              }`,
              '',
              '## Example',
              `\`\`\`${topicData.exampleLanguage}`,
              topicData.example,
              '```',
              '',
              `[Learn more: ${topicData.linkText}](${topicData.link})`,
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          }

        case 'quip':
          if (isShort) {
            return `💡 ${getDescription()}${fileNote}`;
          } else if (isMedium) {
            return `💡 **${topicData.title} Insight**: ${getDescription()} ${
              getFeatures()[0]
            }${fileNote}`;
          } else {
            return [
              `💡 *${topicData.title} Tip*`,
              '',
              `${getDescription()}`,
              '',
              `**Key Point**: ${getFeatures()[0]}`,
              `**Also Important**: ${getFeatures()[1]}`,
              '',
              `[${topicData.linkText}](${topicData.link})`,
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          }

        case 'definition':
          if (isShort) {
            return [`# ${topicData.title}`, `${getDescription()}`, fileNote]
              .filter((line) => line !== '')
              .join('\n');
          } else if (isMedium) {
            return [
              `# ${topicData.title}`,
              '',
              `## Definition`,
              getDescription(),
              '',
              '## Key Features',
              ...getFeatures().map((f) => `- ${f}`),
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          } else {
            return [
              `# ${topicData.title}`,
              '',
              `## Definition`,
              getDescription(),
              '',
              '## Key Features',
              ...getFeatures().map((f) => `- ${f}`),
              '',
              '## Example',
              `\`\`\`${topicData.exampleLanguage}`,
              topicData.example,
              '```',
              '',
              `[${topicData.linkText}](${topicData.link})`,
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          }

        case 'qa':
          if (isShort) {
            return [
              `# ${topicData.title} Q&A`,
              '',
              `## What is ${topicData.title}?`,
              getDescription(),
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          } else if (isMedium) {
            return [
              `# ${topicData.title} Q&A`,
              '',
              `## What is ${topicData.title}?`,
              getDescription(),
              '',
              '## How does it work?',
              getFeatures()[0],
              '',
              '## Why is it important?',
              getFeatures()[1],
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          } else {
            return [
              `# ${topicData.title} Q&A`,
              '',
              `## What is ${topicData.title}?`,
              getDescription(),
              '',
              '## How does it work?',
              getFeatures()[0],
              '',
              '## Why is it important?',
              getFeatures()[1],
              '',
              '## Pro Tips',
              `- ${getFeatures()[2]}`,
              `- ${getFeatures()[3] || 'Keep learning and experimenting'}`,
              '',
              '## Example',
              `\`\`\`${topicData.exampleLanguage}`,
              topicData.example,
              '```',
              '',
              `[${topicData.linkText}](${topicData.link})`,
              fileNote,
            ]
              .filter((line) => line !== '')
              .join('\n');
          }

        case 'summary':
        default:
          if (isShort) {
            return `${getDescription()}${fileNote}`;
          } else if (isMedium) {
            return `${getDescription()} ${getFeatures()
              .slice(0, 2)
              .join(' ')}${fileNote}`;
          } else {
            return `${getDescription()} ${getFeatures().join(
              ' '
            )} [Learn more](${topicData.link})${fileNote}`;
          }
      }
    },
    defaultNextStepId: 'goodbye',
  },
  {
    id: 'goodbye',
    agentQuestion:
      'Thank you for using our SEO content manager. Have a great day!',
    defaultNextStepId: 'start',
  },
];
