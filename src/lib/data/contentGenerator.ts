import { contentData } from './agent';

type ContentOptions = {
  tone: string;
  length: number;
  includeOutline: boolean;
  replyStyle?: string;
};

interface TopicContent {
  title: string;
  description: string;
  descriptionShort: string;
  features: string[];
  featuresBrief: string[];
  example: string;
  link: string;
  linkText: string;
  exampleLanguage: string;
}
const getTopicContent = (
  topic: string,
  length: number
): TopicContent & {
  getDescription: () => string;
  getFeatures: () => string[];
} => {
  const isChatGPT = topic.toLowerCase() === 'chatgpt';
  const isShort = length <= 3;
  const topicData = isChatGPT ? contentData.chatgpt : contentData.seo;

  const getDescription = () =>
    isShort ? topicData.descriptionShort : topicData.description;
  const getFeatures = () =>
    isShort ? topicData.featuresBrief : topicData.features;

  return { ...topicData, getDescription, getFeatures };
};

const generateBullets = (
  topicContent: ReturnType<typeof getTopicContent>,
  length: number,
  fileNote: string
): string => {
  const {
    title,
    getDescription,
    getFeatures,
    example,
    exampleLanguage,
    link,
    linkText,
  } = topicContent;
  const isShort = length <= 3;
  const isMedium = length > 3 && length <= 7;

  if (isShort) {
    return [
      `## ${title}`,
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
      `## ${title}`,
      getDescription(),
      '',
      '### Key Features',
      ...getFeatures().map((f) => `- ${f}`),
      '',
      '### Example',
      `\`\`\`${exampleLanguage}`,
      example,
      '```',
      fileNote,
    ]
      .filter((line) => line !== '')
      .join('\n');
  } else {
    return [
      `## ${title}`,
      getDescription(),
      '',
      '### Key Features',
      ...getFeatures().map((f) => `- ${f}`),
      '',
      '### Example',
      `\`\`\`${exampleLanguage}`,
      example,
      '```',
      `[${linkText}](${link})`,
      fileNote,
    ]
      .filter((line) => line !== '')
      .join('\n');
  }
};

const generateSteps = (
  topicContent: ReturnType<typeof getTopicContent>,
  length: number,
  fileNote: string
): string => {
  const {
    title,
    getDescription,
    getFeatures,
    example,
    exampleLanguage,
    link,
    linkText,
  } = topicContent;
  const isShort = length <= 3;
  const isMedium = length > 3 && length <= 7;

  if (isShort) {
    return [
      `# ${title}`,
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
      `# ${title}`,
      getDescription(),
      '',
      '## Getting Started',
      `1. **Understand the basics**: ${getFeatures()[0]}`,
      `2. **Learn the fundamentals**: ${getFeatures()[1]}`,
      `3. **Apply best practices**: ${getFeatures()[2]}`,
      '',
      '## Example',
      `\`\`\`${exampleLanguage}`,
      example,
      '```',
      fileNote,
    ]
      .filter((line) => line !== '')
      .join('\n');
  } else {
    return [
      `# ${title}`,
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
      `\`\`\`${exampleLanguage}`,
      example,
      '```',
      '',
      `[Learn more: ${linkText}](${link})`,
      fileNote,
    ]
      .filter((line) => line !== '')
      .join('\n');
  }
};

const generateQuip = (
  topicContent: ReturnType<typeof getTopicContent>,
  length: number,
  fileNote: string
): string => {
  const { title, getDescription, getFeatures, link, linkText } = topicContent;
  const isShort = length <= 3;
  const isMedium = length > 3 && length <= 7;

  if (isShort) {
    return `💡 ${getDescription()}${fileNote}`;
  } else if (isMedium) {
    return `💡 **${title} Insight**: ${getDescription()} ${
      getFeatures()[0]
    }${fileNote}`;
  } else {
    return [
      `💡 *${title} Tip*`,
      '',
      `${getDescription()}`,
      '',
      `**Key Point**: ${getFeatures()[0]}`,
      `**Also Important**: ${getFeatures()[1]}`,
      '',
      `[${linkText}](${link})`,
      fileNote,
    ]
      .filter((line) => line !== '')
      .join('\n');
  }
};

const generateDefinition = (
  topicContent: ReturnType<typeof getTopicContent>,
  length: number,
  fileNote: string
): string => {
  const {
    title,
    getDescription,
    getFeatures,
    example,
    exampleLanguage,
    link,
    linkText,
  } = topicContent;
  const isShort = length <= 3;
  const isMedium = length > 3 && length <= 7;

  if (isShort) {
    return [`# ${title}`, `${getDescription()}`, fileNote]
      .filter((line) => line !== '')
      .join('\n');
  } else if (isMedium) {
    return [
      `# ${title}`,
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
      `# ${title}`,
      '',
      `## Definition`,
      getDescription(),
      '',
      '## Key Features',
      ...getFeatures().map((f) => `- ${f}`),
      '',
      '## Example',
      `\`\`\`${exampleLanguage}`,
      example,
      '```',
      '',
      `[${linkText}](${link})`,
      fileNote,
    ]
      .filter((line) => line !== '')
      .join('\n');
  }
};

const generateQA = (
  topicContent: ReturnType<typeof getTopicContent>,
  length: number,
  fileNote: string
): string => {
  const {
    title,
    getDescription,
    getFeatures,
    example,
    exampleLanguage,
    link,
    linkText,
  } = topicContent;
  const isShort = length <= 3;
  const isMedium = length > 3 && length <= 7;

  if (isShort) {
    return [
      `# ${title} Q&A`,
      '',
      `## What is ${title}?`,
      getDescription(),
      fileNote,
    ]
      .filter((line) => line !== '')
      .join('\n');
  } else if (isMedium) {
    return [
      `# ${title} Q&A`,
      '',
      `## What is ${title}?`,
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
      `# ${title} Q&A`,
      '',
      `## What is ${title}?`,
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
      `\`\`\`${exampleLanguage}`,
      example,
      '```',
      '',
      `[${linkText}](${link})`,
      fileNote,
    ]
      .filter((line) => line !== '')
      .join('\n');
  }
};

const generateSummary = (
  topicContent: ReturnType<typeof getTopicContent>,
  length: number,
  fileNote: string
): string => {
  const { getDescription, getFeatures, link } = topicContent;
  const isShort = length <= 3;
  const isMedium = length > 3 && length <= 7;

  if (isShort) {
    return `${getDescription()}${fileNote}`;
  } else if (isMedium) {
    return `${getDescription()} ${getFeatures()
      .slice(0, 2)
      .join(' ')}${fileNote}`;
  } else {
    return `${getDescription()} ${getFeatures().join(
      ' '
    )} [Learn more](${link})${fileNote}`;
  }
};

export const contentResponseGenerator = (
  options: ContentOptions,
  topic: string,
  hasAttachedFiles: boolean
): string | string[] | Record<string, unknown> => {
  const { replyStyle = 'summary', length = 5 } = options;
  const topicContent = getTopicContent(topic, length);
  const fileNote = hasAttachedFiles
    ? ' *Generated with your reference files in mind.*'
    : '';

  switch (replyStyle) {
    case 'bullets':
      return generateBullets(topicContent, length, fileNote);
    case 'steps':
      return generateSteps(topicContent, length, fileNote);
    case 'quip':
      return generateQuip(topicContent, length, fileNote);
    case 'definition':
      return generateDefinition(topicContent, length, fileNote);
    case 'qa':
      return generateQA(topicContent, length, fileNote);
    case 'summary':
    default:
      return generateSummary(topicContent, length, fileNote);
  }
};
