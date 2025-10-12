import { ConversationStep } from '@/types/agent';
import { contentResponseGenerator } from '../data/contentGenerator';

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
    isContentGenerationStep: true,
    responseGenerator: contentResponseGenerator,
    defaultNextStepId: 'goodbye',
  },
  {
    id: 'goodbye',
    agentQuestion:
      'Thank you for using our SEO content manager. Have a great day!',
    defaultNextStepId: 'start',
  },
];
