import { useEffect, useRef, useState } from 'react';
import album from './data/album.json';
import s from './App.module.css';

type Block = {type:string;text?:string};
const pad=(n:number)=>String(n).padStart(2,'0');
const links=[['top','首頁'],['intro','專輯簡介'],['concept','專輯概念'],['scene','時間場景'],['songs','曲目']];
function Blocks({blocks}:{blocks:Block[]}) {return <div className={s.prose}>{blocks.map((b,i)=>b.type==='spacer'?<div key={i} className={s.spacer} aria-hidden="true"/>:<p key={i}>{b.text}</p>)}</div>}

const TRACK_YT_LINKS: Record<string, string> = {
  'track-01': 'https://youtu.be/WqGY_Ngh7BQ?si=0YdhhwSelzYkGI6y',
  'track-02': 'https://youtu.be/Ujor1dWS02k?si=fOyORhyEpTIubxU6',
  'track-03': 'https://youtu.be/9pX2srGXjXo?si=Jv2bMW20X1ANAdec',
  'track-04': 'https://youtu.be/9pX2srGXjXo?si=Jv2bMW20X1ANAdec',
  'track-05': 'https://youtu.be/MOesNU1ZGN8?si=FwlCqQVA5kb-AUJg',
  'track-06': 'https://youtu.be/WIyExqKvhYg?si=D8lsaG_Q5pYx58M2',
  'track-07': 'https://youtu.be/mcZNTcg72QU?si=se-fIXx8hfQpDiy3',
  'track-08': 'https://youtu.be/SzukLW01s_E?si=VNSDnmbGOmqRDqtb',
  'track-09': 'https://youtu.be/cQzrxayo4R0?si=nSmtb954ZJsELMcJ',
  'track-10': 'https://youtu.be/cQzrxayo4R0?si=nSmtb954ZJsELMcJ',
  'track-11': 'https://youtu.be/zTUWGUKlpBw?si=hErCSQ-s3TIvM1Vo',
  'track-12': 'https://youtu.be/4N6GH5Grwj8?si=H96l0LtRYcUUnmEj',
  'track-13': 'https://youtu.be/XFtRiCe7hYw?si=jZAXyA8rQXCCg2OW',
  'track-14': 'https://youtu.be/hUuXI7KwzXE?si=X13o_VpVvf5yONJk',
};

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className={s.ytIcon} aria-hidden="true">
      <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function App(){
 const [menu,setMenu]=useState(false),[selected,setSelected]=useState(()=>Math.max(0,album.tracks.findIndex(t=>'#'+t.id===location.hash))),[active,setActive]=useState('top'),[progress,setProgress]=useState(0);
 const story=useRef<HTMLElement>(null);const track=album.tracks[selected];
 useEffect(()=>{
  const scroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;setProgress(max>0?scrollY/max:0)};
  window.addEventListener('scroll',scroll,{passive:true});scroll();
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add(s.visible);setActive(e.target.id)}}),{rootMargin:'-15% 0px -45% 0px',threshold:0});
  document.querySelectorAll('main > section').forEach(el=>observer.observe(el));
  const hash=()=>{const i=album.tracks.findIndex(t=>'#'+t.id===location.hash);if(i>=0){setSelected(i);requestAnimationFrame(()=>story.current?.scrollIntoView())}};
  window.addEventListener('hashchange',hash);hash();
  return()=>{observer.disconnect();window.removeEventListener('scroll',scroll);window.removeEventListener('hashchange',hash)};
 },[]);
 function choose(i:number){setSelected(i);history.replaceState(null,'','#'+album.tracks[i].id);requestAnimationFrame(()=>{story.current?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});story.current?.focus({preventScroll:true})})}
 return <><a className={s.skip} href="#intro">跳至專輯內容</a><div className={s.progress} style={{transform:`scaleX(${progress})`}} aria-hidden="true"/>
 <header className={s.header}><div className={s.disclaimer}><span className={s.disclaimerBadge}>聲明</span><span>此網頁由粉絲個人製作，非官方</span></div><div className={s.headerInner}><a className={s.brand} href="#top" aria-label="反深代詞 首頁"><span className={s.symbol}>反</span><span>周深 <span className={s.brandSub}>／ 反深代詞</span></span></a><button className={s.menuButton} aria-expanded={menu} aria-controls="main-nav" onClick={()=>setMenu(!menu)}>{menu?'關閉 −':'目錄 ＋'}</button><nav id="main-nav" className={`${s.nav} ${menu?s.open:''}`} aria-label="主要導覽">{links.map(([id,label],i)=><a key={id} href={'#'+id} aria-current={active===id?'location':undefined} onClick={()=>setMenu(false)}><span>{pad(i)}</span>{label}</a>)}</nav></div></header>
 <main><section id="top" className={s.hero}><div className={s.cosmos} aria-hidden="true"><div className={s.orbit}/><div className={s.orbitTwo}/><div className={s.rift}/><span className={s.starOne}>＋</span><span className={s.starTwo}>＋</span></div><div className={s.heroText}><div className={s.eyebrow}><span className={s.dot}/> ZHOU SHEN · ALBUM NARRATIVE</div><p className={s.artist}>周 深</p><h1>反<span>深</span>代詞</h1><div className={s.tagline}><p>以反面窺探天地</p><p>尋深處無限自我</p></div><a className={s.explore} href="#intro">探索專輯 <span>↗</span></a></div><div className={s.heroBottom}><span>01 — 14 <i/> 十四個曲目章節</span><a href="#intro">向下探索 <span>↓</span></a><span className={s.coordinates}>SELF / REFLECTION / BEYOND</span></div></section>
 {album.sections.map((section,index)=><section key={section.id} id={section.id} className={`${s.section} ${s[section.id]}`}><div className={s.sectionLabel}><span>{pad(index+1)} / {['INTRODUCTION','THE CONCEPT','TIME & SPACE'][index]}</span><span>反深代詞</span></div><div className={s.sectionLayout}><div className={s.sectionSide}><h2>{section.title}</h2>{index===0?<div className={s.sideMark} aria-hidden="true">深<span>SELF</span></div>:index===1?<div className={s.mirror} aria-hidden="true"><span>反身</span><span>反深</span></div>:<div className={s.year} aria-hidden="true">200<span>年後</span><div className={s.timeline}>現在 <i/> 未來</div></div>}</div><Blocks blocks={section.blocks}/></div></section>)}
 <section id="songs" className={`${s.section} ${s.songs}`}><div className={s.sectionLabel}><span>04 / THE CHAPTERS</span><span>01 — 14</span></div><div className={s.songsHeading}><h2>{album.songsTitle}</h2><p>十四個章節・循聲而行</p></div><div className={s.readerLayout}><aside className={s.trackAside}><p className={s.listLabel} id="track-list">章節目錄 <span>CHAPTER INDEX</span></p><nav className={s.trackList} aria-label="曲目章節">{album.tracks.map((t,i)=><button key={t.id} aria-current={i===selected?'true':undefined} onClick={()=>choose(i)}><span className={s.trackNumber}>{pad(t.number)}</span><span>{t.title}</span><span className={s.trackArrow}>{i===selected?'↗':'·'}</span></button>)}</nav></aside><article className={s.story} id={track.id} ref={story} tabIndex={-1} aria-labelledby="story-title"><div className={s.readerMeta}><span>CHAPTER {pad(track.number)}</span><span aria-live="polite">{pad(track.number)} <span className={s.dim}>/ 14</span></span></div><div className={s.storyBody} key={track.id}><div className={s.storyHeader}><h3 id="story-title">{track.originalHeading}</h3><a href={TRACK_YT_LINKS[track.id]} target="_blank" rel="noopener noreferrer" className={s.ytLink} title={`在 YouTube 收聽 ${track.title}`}><YouTubeIcon /><span>在 YouTube 收聽 ↗</span></a></div><Blocks blocks={track.blocks}/></div><div className={s.readerControls}><button disabled={selected===0} onClick={()=>choose(selected-1)}>← 上一章</button><a href="#track-list">曲目清單 ↑</a><button disabled={selected===13} onClick={()=>choose(selected+1)}>下一章 →</button></div>{selected===13&&<div className={s.ending}><span aria-hidden="true">✦</span><a href="#top">回到旅程起點 ↑</a></div>}</article></div></section></main>
 <footer className={s.footer}><a href="#top">反深代詞 <span>／ 周深</span></a><span>此網頁由粉絲個人製作，非官方 · 以反面窺探天地，尋深處無限自我</span><a href="#top" aria-label="回到首頁">↑</a></footer></>
}
