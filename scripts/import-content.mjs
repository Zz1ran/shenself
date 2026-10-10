import { readFileSync, writeFileSync } from 'node:fs';
import { load } from 'cheerio';
import assert from 'node:assert/strict';
const $ = load(readFileSync(new URL('../source/反深代词 _ 周深.html', import.meta.url), 'utf8'));
function blocks(node) {
  return $(node).find('p, .blank').toArray().map(el => $(el).hasClass('blank') ? {type:'spacer'} : {type:'paragraph',text:$(el).html() === null ? '' : text(el)});
}
function text(node) { const copy = $(node).clone(); copy.find('br').replaceWith('\n'); return copy.text(); }
const sections = ['intro','concept','scene'].map(id => {
  assert.equal($('#'+id).length,1,`Missing section ${id}`);
  return {id,title:$('#'+id+' h2').text(),blocks:blocks($('#'+id))};
});
const tracks = $('#songs .song').toArray().map((el,i) => ({id:`track-${String(i+1).padStart(2,'0')}`,number:i+1,originalHeading:$(el).find('h3').text(),title:$(el).find('h3').text().replace(/^\d+\.《|》$/g,''),blocks:blocks(el)}));
assert.equal(tracks.length,14);
assert.equal(tracks.reduce((n,t)=>n+t.blocks.filter(b=>b.type==='paragraph').length,0),$('#songs p').length,'All song paragraphs must be included');
const result=JSON.stringify({sections,songsTitle:$('#songs > h2').text(),tracks},null,2)+'\n';
const destination=new URL('../src/data/album.json',import.meta.url);
if(process.argv.includes('--check')) assert.equal(readFileSync(destination,'utf8'),result,'Content differs: run npm run content');
else writeFileSync(destination,result);
console.log(`Verified ${tracks.length} tracks, ${$('section p').length} paragraphs and ${$('section .blank').length} narrative spacers.`);
