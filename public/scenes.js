'use strict';
const filterButtons = [...document.querySelectorAll('[data-dimension-filter]')];
const groups = [...document.querySelectorAll('.scene-group')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.dimensionFilter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  groups.forEach(group => {
    group.hidden = selected !== 'ALL' && group.dataset.dimension !== selected;
    if (group.hidden) group.querySelectorAll('video').forEach(video => video.pause());
  });
  document.querySelector('#scene-filter-count').textContent = selected === 'ALL'
    ? '显示 24 个场景 · 18 训练 / 6 测试'
    : `${selected} · 显示 4 个场景 · 3 训练 / 1 测试`;
}));
document.addEventListener('play', event => {
  if (event.target.tagName === 'VIDEO') document.querySelectorAll('video').forEach(video => {
    if (video !== event.target) video.pause();
  });
}, true);
document.querySelectorAll('a[href^="#group-"]').forEach(link => link.addEventListener('click', () => {
  filterButtons.find(button => button.dataset.dimensionFilter === 'ALL').click();
}));
const menu = document.querySelector('.mobile-menu');
const nav = document.querySelector('.site-header nav');
menu.addEventListener('click', () => menu.setAttribute('aria-expanded', String(nav.classList.toggle('open'))));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));
