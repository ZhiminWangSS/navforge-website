'use strict';
const tabs = [...document.querySelectorAll('[data-task-dimension]')];
function chooseTaskDimension(dim, focus = false) {
  if (!tabs.some(tab => tab.dataset.taskDimension === dim)) return;
  tabs.forEach(tab => {
    const active = tab.dataset.taskDimension === dim;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.querySelector('#' + tab.getAttribute('aria-controls')).hidden = !active;
    if (active && focus) tab.focus();
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => chooseTaskDimension(tab.dataset.taskDimension));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length-1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    chooseTaskDimension(tabs[next].dataset.taskDimension, true);
  });
});
function openTaskHash() {
  const match = location.hash.match(/^#design-((SG|SP|GE|LH|MP|SE)\d{2})$/);
  if (!match) return;
  const task = document.getElementById('design-' + match[1]);
  if (!task) return;
  chooseTaskDimension(match[2]);
  task.open = true;
  const extras = task.closest('.task-extras');
  if (extras) extras.open = true;
  task.scrollIntoView({block:'start'});
}
window.addEventListener('hashchange', openTaskHash);
openTaskHash();
const menu = document.querySelector('.mobile-menu'), nav = document.querySelector('.site-header nav');
menu.addEventListener('click', () => menu.setAttribute('aria-expanded', String(nav.classList.toggle('open'))));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
}));
