import {
  CardHeading,
  CardList,
  EmojiSmile,
  Palette,
  QuestionCircle,
  Translate,
  Braces,
  Globe,
  ChatText,
} from 'react-bootstrap-icons'
import { getPreferredLanguage } from '../../config/language.mjs'

const createGenPrompt =
  ({
    message = '',
    isTranslation = false,
    targetLanguage = '',
    enableBidirectional = false,
    includeLanguagePrefix = false,
  }) =>
  async (selection) => {
    let preferredLanguage = targetLanguage

    if (!preferredLanguage) {
      preferredLanguage = await getPreferredLanguage()
    }

    let fullMessage = isTranslation
      ? `Translate the following into ${preferredLanguage} and only show me the translated content`
      : message
    if (enableBidirectional) {
      fullMessage += `. If it is already in ${preferredLanguage}, translate it into English and only show me the translated content`
    }
    const prefix = includeLanguagePrefix ? `Reply in ${preferredLanguage}.` : ''
    return `${prefix}${fullMessage}:\n'''\n${selection}\n'''`
  }

export const config = {
  explain: {
    icon: <ChatText />,
    label: 'Explain',
    genPrompt: createGenPrompt({
      message: 'Explain the following',
      includeLanguagePrefix: true,
    }),
  },
  translate: {
    icon: <Translate />,
    label: 'Translate',
    genPrompt: createGenPrompt({
      isTranslation: true,
    }),
  },
  translateToEn: {
    icon: <Globe />,
    label: 'Translate (To English)',
    genPrompt: createGenPrompt({
      isTranslation: true,
      targetLanguage: 'English',
    }),
  },
  translateToZh: {
    icon: <Globe />,
    label: 'Translate (To Chinese)',
    genPrompt: createGenPrompt({
      isTranslation: true,
      targetLanguage: 'Chinese',
    }),
  },
  translateBidi: {
    icon: <Globe />,
    label: 'Translate (Bidirectional)',
    genPrompt: createGenPrompt({
      isTranslation: true,
      enableBidirectional: true,
    }),
  },
  addtests: {
    icon: <CardHeading />,
    label: 'Add Tests',
    genPrompt: createGenPrompt({
      message: "Add tests to the following code, let's think step by step",
      includeLanguagePrefix: true,
    }),
  },
  codereview: {
    icon: <Palette />,
    label: 'Code Review',
    genPrompt: createGenPrompt({
      message:
        "Review the following code for possible bugs and optimize it, let's think step by step",
    }),
  },
  findvulnerabilities: {
    icon: <EmojiSmile />,
    label: 'Find Vulnerabilities',
    genPrompt: createGenPrompt({
      message: "Find vulnerabilities in the following code, let's think step by step",
      includeLanguagePrefix: true,
    }),
  },
  divide: {
    icon: <CardList />,
    label: 'Optimize',
    genPrompt: createGenPrompt({
      message: "Optimize the following code, let's think step by step",
    }),
  },
  code: {
    icon: <Braces />,
    label: 'Code Explain',
    genPrompt: createGenPrompt({
      message: "Explain the following code, let's think step by step",
      includeLanguagePrefix: true,
    }),
  },
  ask: {
    icon: <QuestionCircle />,
    label: 'Ask',
    genPrompt: createGenPrompt({
      message: 'Analyze the following content and express your opinion, or give your answer',
      includeLanguagePrefix: true,
    }),
  },
}
