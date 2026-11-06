export type TypstLanguage = 'en' | 'zh';

export interface TypstDocument {
  readonly source: string;
  readonly name: string;
  readonly language: TypstLanguage;
  readonly personalInformationHeading: string;
  readonly nameLabel: string;
  readonly workExperienceHeading: string;
  readonly author: string;
  readonly title: string;
  readonly keywords: readonly string[];
}

export const typstDocuments: readonly TypstDocument[];

export function renderTypst(
  markdown: string,
  document: TypstDocument,
): string;
