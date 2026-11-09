/* Presentation-only access gate. Public source and media remain directly accessible. */
(() => {
  'use strict';
  const base = new URL('.', document.currentScript.src).pathname;
  const key = `navforge-access:${base}:v1`;
  const lifetime = 12 * 60 * 60 * 1000;
  // Encoding only, deliberately not represented as server-side authentication.
  const expected = 'bmF2Zm9yZ2U2NjY=';
  let overlay;
  const valid = () => {
    try { const expiry = Number(sessionStorage.getItem(key)); return expiry > Date.now() && expiry <= Date.now() + lifetime; }
    catch { return false; }
  };
  const unlock = () => {
    document.documentElement.classList.remove('navforge-locked');
    overlay?.remove();
    overlay = null;
  };
  if (valid()) document.documentElement.classList.remove('navforge-locked');
  const show = () => {
    document.documentElement.classList.add('navforge-locked');
    document.querySelectorAll('video,audio').forEach(media => media.pause());
    if (overlay) return;
    overlay = document.createElement('section');
    overlay.id = 'navforge-access';
    overlay.setAttribute('aria-label', 'NavForge 访问登录');
    overlay.innerHTML = `<div class="access-card"><div class="access-brand">navforge <span>RESEARCH ACCESS</span></div><p class="access-eyebrow">ACCESS / NAVFORGE</p><h1>下一程，从这里开始。</h1><p>输入访问密码，查看项目进展、任务与测评录像。</p><form><label for="access-password">访问密码 / ACCESS PASSWORD</label><div class="access-input"><input id="access-password" name="password" type="password" autocomplete="current-password" maxlength="256" required><button type="button" class="access-show" aria-pressed="false">显示</button></div><p class="access-error" role="alert" aria-live="polite"></p><button class="access-submit" type="submit">进入 NavForge <span>↗</span></button></form><p class="access-note">当前标签页登录状态保留 12 小时。</p></div>`;
    document.body.append(overlay);
    const field = overlay.querySelector('input');
    const toggle = overlay.querySelector('.access-show');
    toggle.addEventListener('click', () => {
      const reveal = field.type === 'password';
      field.type = reveal ? 'text' : 'password';
      toggle.textContent = reveal ? '隐藏' : '显示';
      toggle.setAttribute('aria-pressed', String(reveal));
    });
    overlay.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      let matches = false;
      try { matches = btoa(field.value) === expected; } catch { /* Non-Latin input cannot match. */ }
      if (!matches) {
        overlay.querySelector('.access-error').textContent = '密码不正确，请重新输入。';
        field.focus(); field.select(); return;
      }
      try { sessionStorage.setItem(key, String(Date.now() + lifetime)); }
      catch { /* Allow this page when browser storage is disabled. */ }
      field.value = '';
      unlock();
    });
    field.focus();
  };
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `#navforge-access{position:fixed;inset:0;z-index:2147483647;overflow:auto;min-height:100dvh;display:grid;place-items:center;padding:28px;background:#0b0e0c;color:#eeeee5;font-family:Arial,'PingFang SC',sans-serif;text-align:left}#navforge-access *{box-sizing:border-box}.access-card{width:min(100%,460px);padding:36px;border:1px solid #36402e;background:#11160f}.access-brand{display:flex;align-items:center;justify-content:space-between;font-size:28px;font-weight:700;letter-spacing:-1px}.access-brand span{font-size:9px;color:#939e89;letter-spacing:.08em}.access-eyebrow{color:#c5fa53!important;font:10px monospace!important;margin-top:38px!important}.access-card h1{font-size:30px;line-height:1.35;letter-spacing:-1px;margin:18px 0}.access-card p{font-size:13px;line-height:1.8;color:#a0aa95}.access-card label{display:block;font-size:11px;margin:26px 0 10px}.access-input{display:flex;border:1px solid #49563d}.access-input:focus-within{border-color:#c5fa53}.access-input input{width:100%;min-width:0;padding:16px;border:0;outline:none;background:#0b0e0c;color:#eeeee5;font-size:16px}.access-card button{cursor:pointer;border:0;font-family:inherit}.access-show{background:#0b0e0c;color:#a0aa95;padding:0 14px;white-space:nowrap}.access-submit{display:flex;justify-content:space-between;width:100%;padding:17px 18px;background:#c5fa53;color:#0b0e0c;font-weight:600}.access-error{min-height:22px;color:#ffaf96!important}.access-note{margin:24px 0 0!important;font-size:11px!important}.access-card button:focus-visible{outline:2px solid #c5fa53;outline-offset:4px}@media(max-width:500px){.access-card{padding:26px 22px}.access-card h1{font-size:25px}}`;
    document.head.append(style);
    if (!valid()) show();
    document.querySelectorAll('[data-navforge-logout]').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        try { sessionStorage.removeItem(key); } catch {}
        show();
      });
    });
    // Recheck restored pages and long-lived tabs.
    window.addEventListener('pageshow', () => { if (!valid()) show(); });
    document.addEventListener('visibilitychange', () => { if (!document.hidden && !valid()) show(); });
    setInterval(() => { if (!valid()) show(); }, 30000);
  });
})();
