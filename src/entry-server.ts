import { render } from 'svelte/server';
import ResumeContentEn from './contents/CV_en.md';
import ResumeContentZh from './contents/CV_zh.md';
import ResumePage from './lib/components/ResumePage.svelte';

type Language = 'zh' | 'en';

export function renderPage(lang: Language) {
  const content = lang === 'zh' ? ResumeContentZh : ResumeContentEn;

  return render(ResumePage, {
    props: { lang, content }
  });
}
