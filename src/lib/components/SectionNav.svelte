<script lang="ts">
  import { Briefcase, Code2, Folder, Heart, UserRound } from '@lucide/svelte';

  let { lang }: { lang: 'zh' | 'en' } = $props();
</script>

<nav class="section-nav" aria-label={lang === 'zh' ? '简历章节' : 'Résumé sections'}>
  {#if lang === 'zh'}
    <a href="#个人信息"><UserRound size={17} strokeWidth={1.8} aria-hidden="true" /><span>个人信息</span></a>
    <a href="#项目经历"><Folder size={17} strokeWidth={1.8} aria-hidden="true" /><span>项目经历</span></a>
    <a href="#工作经历"><Briefcase size={17} strokeWidth={1.8} aria-hidden="true" /><span>工作经历</span></a>
    <a href="#技术栈"><Code2 size={17} strokeWidth={1.8} aria-hidden="true" /><span>技术栈</span></a>
    <a href="#兴趣爱好"><Heart size={17} strokeWidth={1.8} aria-hidden="true" /><span>兴趣爱好</span></a>
  {:else}
    <a href="#personal-information"><UserRound size={17} strokeWidth={1.8} aria-hidden="true" /><span>Profile</span></a>
    <a href="#project-experience"><Folder size={17} strokeWidth={1.8} aria-hidden="true" /><span>Projects</span></a>
    <a href="#work-experience"><Briefcase size={17} strokeWidth={1.8} aria-hidden="true" /><span>Experience</span></a>
    <a href="#technical-stack"><Code2 size={17} strokeWidth={1.8} aria-hidden="true" /><span>Stack</span></a>
    <a href="#interests--hobbies"><Heart size={17} strokeWidth={1.8} aria-hidden="true" /><span>Interests</span></a>
  {/if}
</nav>
