/* Curaters team dashboard – script.js
   Sections: core · connection & sign-in · sign-in screens · shell · pages · start
   It talks only to the Curaters database (Supabase). The only thing kept in the browser is the open session,
   which is wiped when the tab closes. */
(function () {
  'use strict';
  const FRAMED = (() => { try { return window.top !== window.self; } catch (e) { return true; } })();
  const SB = 'https://qssazubhhjycietforpx.supabase.co', KEY = 'sb_publishable_US3r3Qd1x9O8KLj5RBUqGw_LqMcFZmg', LOGO = 'data:image/png;base64,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';
  const IDLE_MS = 20 * 60 * 1000;
  const THEMES = [['heritage', 'Heritage & History'], ['safari', 'Safari & Wildlife'], ['beach', 'Beach & Islands'], ['adventure', 'Adventure & Nature'], ['culture', 'City & Culture']];
  const TYPES = { day: 'Day trip', group: 'Group trip', private: 'Private trip', hosted: 'Hosted trip' };
  const STATUSES = [['new', 'New'], ['contacted', 'Contacted'], ['confirmed', 'Confirmed'], ['paid', 'Paid'], ['cancelled', 'Cancelled']];
  const TRIP_STATUS = [['open', 'Open'], ['pending', 'Pending'], ['soldout', 'Full'], ['hidden', 'Hidden']];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const SEASON = ['Off-season', 'Fair', 'Good', 'Prime'];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => '$' + Number(n || 0).toLocaleString('en-US', { maximumFractionDigits: 0 });
  const fmtDate = (iso) => { try { return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }); } catch (e) { return iso || ''; } };
  const fmtDay = (iso) => { try { return new Date(iso + (String(iso).length === 10 ? 'T00:00:00' : '')).toLocaleDateString(undefined, { dateStyle: 'medium' }); } catch (e) { return iso || ''; } };
  const lines = (s) => String(s || '').split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  const slug = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 254;
  const rnd = (n) => crypto.getRandomValues(new Uint8Array(n));
  const num = (v) => { const s = String(v == null ? '' : v).trim(); if (s === '') return null; const n = Number(s); return isFinite(n) ? n : NaN; };

  /* password rules: the same as the database uses when an owner sets a password */
  function pwProblem(pw, email) {
    const local = String(email || '').split('@')[0].toLowerCase();
    if (!pw || pw.length < 12) return 'Use at least 12 characters.';
    if (pw.length > 72) return 'Use at most 72 characters.';
    const kinds = (/[a-z]/.test(pw) ? 1 : 0) + (/[A-Z]/.test(pw) ? 1 : 0) + (/[0-9]/.test(pw) ? 1 : 0) + (/[^A-Za-z0-9]/.test(pw) ? 1 : 0);
    if (kinds < 3) return 'Mix at least three kinds of characters: capitals, small letters, numbers, symbols.';
    if (local.length >= 4 && pw.toLowerCase().indexOf(local) >= 0) return 'The password must not contain the email name.';
    if (/(password|qwerty|123456|letmein|welcome|admin)/i.test(pw)) return 'That password is too easy to guess.';
    return '';
  }
  const pwScore = (p) => Math.min(5, (p.length >= 12 ? 1 : 0) + (p.length >= 16 ? 1 : 0) + (/[a-z]/.test(p) && /[A-Z]/.test(p) ? 1 : 0) + (/[0-9]/.test(p) ? 1 : 0) + (/[^A-Za-z0-9]/.test(p) ? 1 : 0));
  function strongPw() {
    const a = rnd(18), L = 'abcdefghjkmnpqrstuvwxyz', U = 'ABCDEFGHJKMNPQRSTUVWXYZ', D = '23456789', Y = '!#$%*+-=?@', all = L + U + D;
    let s = ''; for (let i = 0; i < 14; i++) s += all[a[i] % all.length];
    return s + U[a[14] % U.length] + D[a[15] % D.length] + Y[a[16] % Y.length] + L[a[17] % L.length];
  }

  /* ---------- small UI helpers ---------- */
  const ICON = {
    dashboard: '<path d="M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z"/>',
    places: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    trips: '<path d="M3 7h18v13H3zM8 7V4h8v3M3 12h18"/>',
    bookings: '<path d="M3 5h18v14H3z"/><path d="M3 9l9 6 9-6"/>',
    team: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 4.6a3.4 3.4 0 0 1 0 6.3M18 14.8c2 .6 3.2 2.3 3.5 5.2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    activity: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    account: '<circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6"/>',
    out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>'
  };
  const ico = (n) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[n] + '</svg>';
  function toast(msg, kind) {
    const host = $('#toasts'); if (!host) return;
    const t = document.createElement('div'); t.className = 'toast' + (kind ? ' ' + kind : ''); t.textContent = msg; host.appendChild(t);
    setTimeout(() => t.remove(), kind === 'err' ? 7000 : 3600);
  }
  function openDialog(title, body, footer, opts) {
    opts = opts || {};
    const d = $('#dlg'); d.onclose = null; d.oncancel = null;
    d.innerHTML = '<div class="dh"><h2 id="dlgT">' + esc(title) + '</h2>' + (opts.persist ? '' : '<button type="button" class="x" aria-label="Close">&times;</button>') + '</div><div class="db">' + body + '</div>' + (footer ? '<div class="df">' + footer + '</div>' : '');
    d.setAttribute('aria-labelledby', 'dlgT');
    d.style.width = opts.wide ? 'min(900px,calc(100% - 24px))' : opts.small ? 'min(480px,calc(100% - 24px))' : '';
    const x = $('.x', d); if (x) x.onclick = closeDialog;
    if (opts.persist) d.oncancel = (e) => e.preventDefault();
    if (!d.open) d.showModal();
    return d;
  }
  function closeDialog() { const d = $('#dlg'); d.onclose = null; d.oncancel = null; if (d.open) d.close(); d.innerHTML = ''; }
  function confirmBox(title, msg, o) {
    o = o || {};
    return new Promise((resolve) => {
      const d = openDialog(title, '<p style="margin-top:0">' + msg + '</p>' + (o.typed ? '<div class="f"><label for="cf">Type <b>' + esc(o.typed) + '</b> to confirm</label><input class="in" id="cf" autocomplete="off"></div>' : ''),
        '<button class="btn ghost" data-r="0" type="button">Cancel</button><button class="btn' + (o.danger ? ' danger' : '') + '" data-r="1" type="button"' + (o.typed ? ' disabled' : '') + '>' + esc(o.ok || 'Confirm') + '</button>', { small: true });
      let done = false; const fin = (v) => { if (done) return; done = true; closeDialog(); resolve(v); };
      $$('[data-r]', d).forEach((b) => { b.onclick = () => fin(b.dataset.r === '1'); });
      d.onclose = () => fin(false);
      if (o.typed) { const inp = $('#cf', d), ok = $('[data-r="1"]', d); inp.oninput = () => { ok.disabled = inp.value.trim().toLowerCase() !== o.typed.toLowerCase(); }; inp.focus(); }
    });
  }
  /* shown once: a temporary password */
  function showSecret(title, intro, rows, after, btnText) {
    const body = '<p style="margin-top:0">' + intro + '</p>' + rows.map((r) => '<div class="f"><span class="lbl">' + esc(r[0]) + '</span><div class="code">' + esc(r[1]) + '</div></div>').join('') +
      '<div class="warnbox">This is shown only once. Copy it and send it to the person in a private message.</div><label class="sw" style="margin-top:14px"><input type="checkbox" id="sv"> <span>I have copied it</span></label>';
    const d = openDialog(title, body, '<button class="btn ghost" id="cp" type="button">Copy</button><button class="btn" id="go" type="button" disabled>' + esc(btnText || 'Done') + '</button>', { persist: true, small: true });
    $('#sv', d).onchange = (e) => { $('#go', d).disabled = !e.target.checked; };
    $('#cp', d).onclick = async () => { try { await navigator.clipboard.writeText(rows.map((r) => r[1]).join('\n')); toast('Copied', 'ok'); } catch (e) { toast('Select the text and copy it by hand'); } };
    $('#go', d).onclick = () => { closeDialog(); if (after) after(); };
  }
  function download(name, text, type) { const u = URL.createObjectURL(new Blob([text], { type: type || 'text/plain' })); const a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 2000); }
  const setErr = (el, msg) => { if (!el) return; el.setAttribute('aria-invalid', msg ? 'true' : 'false'); const f = el.closest('.f'), e = f && $('.err', f); if (e) e.textContent = msg || ''; };
  function bindShow(root) { $$('[data-show]', root).forEach((b) => { b.onclick = () => { const i = $('#' + b.dataset.show); const on = i.type === 'password'; i.type = on ? 'text' : 'password'; b.textContent = on ? 'Hide' : 'Show'; }; }); }
  function bindMeter(root, id) { const i = $('#' + id, root), m = $('.meter i', root); if (!i || !m) return; i.addEventListener('input', () => { const s = pwScore(i.value); m.style.width = (s * 20) + '%'; m.style.background = s < 3 ? 'var(--bad)' : s < 4 ? 'var(--warn)' : 'var(--ok)'; }); }
  const busy = (btn, on, text) => { if (!btn) return; if (on) { btn.dataset.t = btn.textContent; btn.disabled = true; if (text) btn.textContent = text; } else { btn.disabled = false; if (btn.dataset.t) btn.textContent = btn.dataset.t; } };
  const imgOk = (s) => s === '' || /^(https?:\/\/|asset:)/i.test(s);


  /* ---------- connection to the database ---------- */
  const SK = 'curaters.dash.s', LK = 'curaters.dash.lock';
  let S = null, ME = null, FORCE_PW = null, onExpired = () => {};
  try { S = JSON.parse(sessionStorage.getItem(SK)); } catch (e) { S = null; }
  const decode = (t) => { try { const b = atob(String(t).replace(/-/g, '+').replace(/_/g, '/')); return JSON.parse(new TextDecoder().decode(Uint8Array.from(b, (c) => c.charCodeAt(0)))); } catch (e) { return {}; } };
  const claims = () => (S && S.access_token ? decode(S.access_token.split('.')[1] || '') : {});
  function saveS(j) {
    if (!j || !j.access_token) { S = null; try { sessionStorage.removeItem(SK); } catch (e) { /* ignore */ } return; }
    S = { access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at || Math.floor(Date.now() / 1000) + (j.expires_in || 3600), user: { id: j.user && j.user.id, email: j.user && j.user.email } };
    try { sessionStorage.setItem(SK, JSON.stringify(S)); } catch (e) { /* ignore */ }
  }
  async function raw(url, o) {
    o = o || {};
    const h = Object.assign({ apikey: KEY }, o.headers || {});
    if (o.auth !== false && S) h.Authorization = 'Bearer ' + S.access_token;
    let body = o.body;
    if (o.json !== undefined) { h['Content-Type'] = 'application/json'; body = JSON.stringify(o.json); }
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), o.timeout || 25000);
    try { return await fetch(url, { method: o.method || 'GET', headers: h, body, signal: ctl.signal, cache: 'no-store', credentials: 'omit' }); } finally { clearTimeout(to); }
  }
  let refreshing = null;
  function refresh() {
    if (!S) return Promise.resolve(false);
    if (refreshing) return refreshing;
    refreshing = (async () => {
      try {
        const r = await raw(SB + '/auth/v1/token?grant_type=refresh_token', { method: 'POST', auth: false, json: { refresh_token: S.refresh_token } });
        if (!r.ok) { saveS(null); return false; }
        saveS(await r.json()); return true;
      } catch (e) { return null; } finally { refreshing = null; }
    })();
    return refreshing;
  }
  const NET = 'Could not reach the server. Check your connection and try again.';
  async function call(url, o) {
    if (S && S.expires_at - Date.now() / 1000 < 45) await refresh();
    let r;
    try { r = await raw(url, o); } catch (e) { throw new Error(NET); }
    if (r.status === 401 && S && (!o || o.auth !== false)) {
      const ok = await refresh();
      if (ok) { try { r = await raw(url, o); } catch (e) { throw new Error(NET); } }
      if (r.status === 401) { saveS(null); onExpired(); throw new Error('Your session ended. Please sign in again.'); }
    }
    return r;
  }
  const jsonOf = async (r) => { try { return await r.json(); } catch (e) { return {}; } };
  function friendly(j, status) {
    const c = String(j.code || j.error_code || ''), m = String(j.message || j.msg || j.error_description || '');
    if (c === 'P0001' && m) return m;
    if (c === '42501' || status === 403) return 'That is not allowed for your account right now. If you use 2-step verification, sign in again and enter your code.';
    if (c === '23505' || status === 409) return 'That already exists.';
    if (c === '23514' || c === '22001' || c === '22P02' || c === '23502') return 'One of the values is not allowed (too long, empty or in the wrong format). Please check the form.';
    if (c === 'weak_password') return m || 'That password is too weak.';
    if (c === 'same_password') return 'Choose a password different from your current one.';
    if (c === 'otp_expired' || c === 'flow_state_expired') return 'That link or code has expired. Please request a new one.';
    if (c === 'mfa_verification_failed' || c === 'mfa_challenge_expired') return 'That code is not right. Check your authenticator app and try again.';
    if (c === 'over_request_rate_limit' || c === 'over_email_send_rate_limit' || status === 429) return 'Too many tries. Please wait a few minutes and try again.';
    if (status >= 500) return 'The server had a problem. Please try again in a moment.';
    return m || 'Something went wrong. Please try again.';
  }
  const failure = async (r) => { const j = await jsonOf(r); return Object.assign(new Error(friendly(j, r.status)), { status: r.status, code: j.code || j.error_code }); };
  async function rest(path, o) { const r = await call(SB + '/rest/v1/' + path, o); if (!r.ok) throw await failure(r); if (r.status === 204) return null; const t = await r.text(); return t ? JSON.parse(t) : null; }
  const rpc = (name, args) => rest('rpc/' + name, { method: 'POST', json: args || {} });
  const fn = async (action, body) => { const r = await call(SB + '/functions/v1/curaters-mail', { method: 'POST', json: Object.assign({ action }, body || {}) }); const j = await jsonOf(r); if (!j || typeof j !== 'object') return { ok: false, error: 'No answer from the email service.' }; return j; };
  const here = () => location.origin + location.pathname;

  /* ---------- sign-in, 2-step verification ---------- */
  const auth = {
    async signIn(email, password) {
      let r; try { r = await raw(SB + '/auth/v1/token?grant_type=password', { method: 'POST', auth: false, json: { email, password } }); } catch (e) { return { error: NET }; }
      const j = await jsonOf(r);
      if (!r.ok) {
        const c = j.error_code || j.code || '';
        if (c === 'email_not_confirmed') return { error: 'Your email is not verified yet. Use "Forgot password" to get a link by email, or ask the owner to verify you.' };
        if (r.status === 429 || /rate_limit/.test(c)) return { error: 'Too many tries. Please wait a few minutes.' };
        return { bad: true };
      }
      saveS(j); return { ok: true };
    },
    async signOut(scope) { try { if (S) await raw(SB + '/auth/v1/logout?scope=' + (scope || 'local'), { method: 'POST' }); } catch (e) { /* ignore */ } saveS(null); },
    async verifyLink(type, token_hash) {
      let r; try { r = await raw(SB + '/auth/v1/verify', { method: 'POST', auth: false, json: { type, token_hash } }); } catch (e) { throw new Error(NET); }
      const j = await jsonOf(r); if (!r.ok) throw new Error(friendly(j, r.status)); saveS(j);
    },
    async setPassword(pw) { const r = await call(SB + '/auth/v1/user', { method: 'PUT', json: { password: pw } }); if (!r.ok) throw await failure(r); },
    async me() { const r = await call(SB + '/auth/v1/user'); if (!r.ok) throw await failure(r); return r.json(); },
    async factors() { const u = await auth.me(); const all = (u.factors || []).filter((x) => x.factor_type === 'totp'); return { all, verified: all.filter((x) => x.status === 'verified') }; },
    async challenge(id, code) {
      let r = await call(SB + '/auth/v1/factors/' + id + '/challenge', { method: 'POST', json: {} }); if (!r.ok) throw await failure(r);
      const c = await r.json();
      r = await call(SB + '/auth/v1/factors/' + id + '/verify', { method: 'POST', json: { challenge_id: c.id, code: String(code).replace(/\s/g, '') } });
      const j = await jsonOf(r); if (!r.ok) throw new Error(friendly(j, r.status)); saveS(j);
    },
    async enroll() {
      const { all } = await auth.factors();
      for (const f of all.filter((x) => x.status !== 'verified')) await call(SB + '/auth/v1/factors/' + f.id, { method: 'DELETE' });
      const r = await call(SB + '/auth/v1/factors', { method: 'POST', json: { factor_type: 'totp', issuer: 'Curaters dashboard', friendly_name: 'Authenticator ' + (rnd(2)[0] * 256 + rnd(2)[1]) } });
      if (!r.ok) throw await failure(r); return r.json();
    },
    async unenroll(id) { const r = await call(SB + '/auth/v1/factors/' + id, { method: 'DELETE' }); if (!r.ok) throw await failure(r); }
  };
  /* a small delay after wrong passwords (the server also limits tries) */
  const lockLeft = () => { try { const l = JSON.parse(localStorage.getItem(LK)) || {}; return Math.max(0, Math.ceil(((l.until || 0) - Date.now()) / 1000)); } catch (e) { return 0; } };
  const noteFail = () => { try { const l = JSON.parse(localStorage.getItem(LK)) || {}; l.n = (l.n || 0) + 1; if (l.n >= 4) l.until = Date.now() + Math.min(900, 15 * Math.pow(2, l.n - 4)) * 1000; localStorage.setItem(LK, JSON.stringify(l)); } catch (e) { /* ignore */ } };
  const clearFail = () => { try { localStorage.removeItem(LK); } catch (e) { /* ignore */ } };

  /* ---------- sign-in screens ---------- */
  const authShell = (inner) => '<div class="auth"><div class="auth-art"><img src="' + LOGO + '" alt="Curaters"><div><h2>Run every <em>journey</em> from one place.</h2><p>Places, prices and trip requests, always in step with the Curaters website.</p></div><p style="font-size:.8rem;margin:0">Team access only</p></div><div class="auth-form"><div class="auth-card">' + inner + '</div></div></div>';
  const pwField = (id, label, auto) => '<div class="f"><label for="' + id + '">' + label + '</label><div class="pw"><input class="in" id="' + id + '" type="password" autocomplete="' + (auto || 'current-password') + '"><button type="button" data-show="' + id + '">Show</button></div><p class="err" role="alert"></p></div>';
  const newPwFields = (a, b) => pwField(a, 'New password', 'new-password') + '<div class="meter" aria-hidden="true" style="margin:-6px 0 14px"><i></i></div>' + pwField(b, 'Confirm new password', 'new-password') + '<small style="display:block;margin:-6px 0 14px;color:var(--muted)">At least 12 characters, mixing three kinds: capitals, small letters, numbers, symbols.</small>';
  const notice = (n) => n ? '<div class="info" role="status" style="margin-bottom:16px">' + esc(n) + '</div>' : '';
  const viewLoading = () => { $('#app').innerHTML = '<div class="boot" role="status">Loading…</div>'; };
  function viewFail(msg) {
    $('#app').innerHTML = authShell('<h1>Something went wrong</h1><p class="sub">' + esc(msg) + '</p><button class="btn block" id="again" type="button">Try again</button><div class="auth-links"><button class="link" id="so" type="button">Sign out</button></div>');
    $('#again').onclick = () => proceed(); $('#so').onclick = async () => { await auth.signOut(); viewLogin(); };
  }

  function viewLogin(msg, prefill) {
    ME = null;
    $('#app').innerHTML = authShell(notice(msg) + '<h1>Welcome back</h1><p class="sub">Sign in to manage places, prices and trip requests.</p>' +
      '<form id="lf" novalidate><div class="f"><label for="le">Email</label><input class="in" id="le" type="email" autocomplete="username" value="' + esc(prefill || '') + '"><p class="err" role="alert"></p></div>' +
      pwField('lp', 'Password') + '<p class="err" id="lerr" role="alert" style="margin-bottom:10px"></p><button class="btn block" id="lgo" type="submit">Sign in</button></form>' +
      '<div class="auth-links"><button class="link" id="forgot" type="button">Forgot password?</button></div>');
    bindShow($('#app'));
    $('#forgot').onclick = () => viewForgot($('#le').value);
    (prefill ? $('#lp') : $('#le')).focus();
    $('#lf').onsubmit = async (e) => {
      e.preventDefault();
      const email = $('#le').value.trim().toLowerCase(), pw = $('#lp').value, err = $('#lerr'); err.textContent = '';
      if (!emailOk(email) || !pw) { err.textContent = 'Enter your email and password.'; return; }
      const wait = lockLeft(); if (wait) { err.textContent = 'Too many attempts. Try again in ' + (wait > 90 ? Math.ceil(wait / 60) + ' minutes' : wait + ' seconds') + '.'; return; }
      const btn = $('#lgo'); busy(btn, true, 'Signing in…');
      const r = await auth.signIn(email, pw);
      busy(btn, false);
      if (r.ok) { clearFail(); SIGNED_IN = true; return proceed(); }
      if (r.bad) { noteFail(); err.textContent = 'That email and password do not match.'; $('#lp').value = ''; $('#lp').focus(); return; }
      err.textContent = r.error;
    };
  }
  let SIGNED_IN = false;

  function viewForgot(prefill) {
    $('#app').innerHTML = authShell('<h1>Reset your password</h1><p class="sub">Enter your email. If it is on the team, we send a link to choose a new password.</p>' +
      '<form id="ff" novalidate><div class="f"><label for="fe">Email</label><input class="in" id="fe" type="email" autocomplete="username" value="' + esc(prefill || '') + '"><p class="err" role="alert"></p></div>' +
      '<p class="err" id="ferr" role="alert" style="margin-bottom:10px"></p><button class="btn block" id="fgo" type="submit">Email me a link</button></form>' +
      '<div class="auth-links"><button class="link" id="back" type="button">Back to sign in</button></div>');
    $('#back').onclick = () => viewLogin('', $('#fe').value);
    $('#fe').focus();
    $('#ff').onsubmit = async (e) => {
      e.preventDefault();
      const email = $('#fe').value.trim().toLowerCase(), err = $('#ferr'); err.textContent = '';
      if (!emailOk(email)) { err.textContent = 'Enter a valid email address.'; return; }
      const btn = $('#fgo'); busy(btn, true, 'Sending…');
      try { await raw(SB + '/functions/v1/curaters-mail', { method: 'POST', auth: false, json: { action: 'reset', email, redirectTo: here() } }); } catch (x) { busy(btn, false); err.textContent = NET; return; }
      $('#app').innerHTML = authShell('<h1>Check your email</h1><p class="sub">If <b>' + esc(email) + '</b> is on the team, a link is on its way. It works once and expires in about an hour. Look in your spam folder too.</p><button class="btn block" id="back2" type="button">Back to sign in</button>');
      $('#back2').onclick = () => viewLogin('', email);
    };
  }

  function viewSetPassword(kind) {
    const who = (ME && ME.email) || (S && S.user && S.user.email) || '';
    $('#app').innerHTML = authShell('<h1>Choose your own password</h1><p class="sub">' + (kind === 'recovery' ? 'Choose a new password for <b>' + esc(who) + '</b>.' : 'You are signed in as <b>' + esc(who) + '</b> with a temporary password. Choose your own to continue.') + '</p>' +
      '<form id="pf" novalidate>' + newPwFields('np', 'np2') + '<p class="err" id="perr" role="alert" style="margin-bottom:10px"></p><button class="btn block" id="pgo" type="submit">Save and continue</button></form><div class="auth-links"><button class="link" id="so" type="button">Sign out</button></div>');
    bindShow($('#app')); bindMeter($('#app'), 'np'); $('#np').focus();
    $('#so').onclick = () => leave('manual');
    $('#pf').onsubmit = async (e) => {
      e.preventDefault(); const pw = $('#np').value, err = $('#perr'); err.textContent = '';
      const prob = pwProblem(pw, who); if (prob) { err.textContent = prob; return; }
      if (pw !== $('#np2').value) { err.textContent = 'The two passwords do not match.'; return; }
      const btn = $('#pgo'); busy(btn, true, 'Saving…');
      try {
        await auth.setPassword(pw);
        const ok = await rpc('password_changed');
        if (ok !== true) { await auth.signOut(); return viewLogin('Your password was saved. Please sign in with the new password.', who); }
        FORCE_PW = null; toast('Password updated', 'ok'); proceed();
      } catch (x) { busy(btn, false); err.textContent = x.message; }
    };
  }

  function viewMfa(id) {
    $('#app').innerHTML = authShell('<h1>2-step verification</h1><p class="sub">Open your authenticator app and enter the 6-digit code for Curaters.</p>' +
      '<form id="mf" novalidate><div class="f"><label for="mc">6-digit code</label><input class="in code-in" id="mc" inputmode="numeric" autocomplete="one-time-code" maxlength="7"><p class="err" role="alert"></p></div><p class="err" id="merr" role="alert" style="margin-bottom:10px"></p><button class="btn block" id="mgo" type="submit">Verify</button></form>' +
      '<div class="auth-links"><button class="link" id="so" type="button">Sign out</button></div><p class="demo-note">Lost your phone? Ask the owner to reset your 2-step verification under Team.</p>');
    $('#mc').focus(); $('#so').onclick = () => leave('manual');
    $('#mf').onsubmit = async (e) => {
      e.preventDefault(); const err = $('#merr'); err.textContent = '';
      const code = $('#mc').value.replace(/\s/g, ''); if (!/^\d{6}$/.test(code)) { err.textContent = 'Enter the 6 digits from your app.'; return; }
      const btn = $('#mgo'); busy(btn, true, 'Checking…');
      try { await auth.challenge(id, code); proceed(); } catch (x) { busy(btn, false); err.textContent = x.message; $('#mc').select(); }
    };
  }
  /* set up an authenticator app (used on the forced screen and under My account) */
  async function enrollUI(host, done) {
    host.innerHTML = '<p class="hint">Preparing…</p>';
    let en; try { en = await auth.enroll(); } catch (e) { host.innerHTML = '<p class="err">' + esc(e.message) + '</p>'; return; }
    const t = en.totp || {};
    host.innerHTML = '<p style="margin-top:0">1. Install an authenticator app (Google Authenticator, Microsoft Authenticator, Authy or 1Password).<br>2. Scan this code, or type the key by hand.<br>3. Enter the 6-digit code the app shows.</p>' +
      '<div class="qr">' + (/^data:image\//.test(t.qr_code || '') ? '<img src="' + esc(t.qr_code) + '" alt="QR code to scan" width="200" height="200">' : '') + '</div>' +
      '<p style="text-align:center;margin:6px 0 14px"><small>Key: </small><code class="keytxt">' + esc(t.secret || '') + '</code></p>' +
      '<form id="ef" novalidate><div class="f"><label for="ec">6-digit code</label><input class="in code-in" id="ec" inputmode="numeric" autocomplete="one-time-code" maxlength="7"><p class="err" role="alert"></p></div><p class="err" id="eerr" role="alert"></p><button class="btn block" id="ego" type="submit">Turn on 2-step verification</button></form>';
    $('#ec', host).focus();
    $('#ef', host).onsubmit = async (e) => {
      e.preventDefault(); const err = $('#eerr', host); err.textContent = '';
      const code = $('#ec', host).value.replace(/\s/g, ''); if (!/^\d{6}$/.test(code)) { err.textContent = 'Enter the 6 digits from your app.'; return; }
      const btn = $('#ego', host); busy(btn, true, 'Checking…');
      try { await auth.challenge(en.id, code); try { await rpc('log_security', { p_event: 'mfa_on' }); } catch (x) { /* ignore */ } done(); } catch (x) { busy(btn, false); err.textContent = x.message; }
    };
  }
  function viewEnrollForced() {
    $('#app').innerHTML = authShell('<h1>Turn on 2-step verification</h1><p class="sub">The owner requires it for everyone on the team. It takes a minute.</p><div id="eh"></div><div class="auth-links"><button class="link" id="so" type="button">Sign out</button></div>');
    $('#so').onclick = () => leave('manual');
    enrollUI($('#eh'), () => { toast('2-step verification is on', 'ok'); proceed(); });
  }

  /* what happens after every sign-in: 2-step check, team check, password change, then the dashboard */
  async function proceed(msg) {
    viewLoading();
    try {
      if (!S) return viewLogin(msg);
      const f = await auth.factors();
      if (f.verified.length && (claims().aal || 'aal1') !== 'aal2') return viewMfa(f.verified[0].id);
      const w = await rpc('whoami'); ME = Array.isArray(w) && w[0] ? w[0] : null;
      if (!ME) { await auth.signOut(); return viewLogin('That account does not have access to this dashboard.'); }
      if (ME.must_change) return viewSetPassword('temp');
      if (FORCE_PW) return viewSetPassword(FORCE_PW);
      if (ME.require_mfa && !f.verified.length) return viewEnrollForced();
      startShell();
    } catch (e) { if (!S) return viewLogin(e.message); viewFail(e.message); }
  }
  function readHash() {
    const h = location.hash.replace(/^#/, ''); if (!h || h.charAt(0) === '/') return null;
    const p = new URLSearchParams(h);
    if (!(p.get('token_hash') || p.get('access_token') || p.get('error'))) return null;
    return { type: p.get('type') || '', token_hash: p.get('token_hash') || '', access_token: p.get('access_token') || '', refresh_token: p.get('refresh_token') || '', expires_in: Number(p.get('expires_in') || 3600), error: p.get('error_description') || p.get('error') || '' };
  }


  /* ---------- the dashboard shell ---------- */
  const NAV = [['overview', 'Overview', 'dashboard'], ['bookings', 'Booking requests', 'bookings'], ['formq', 'Booking form', 'settings'], ['places', 'Places', 'places'], ['countries', 'Countries', 'places'], ['trips', 'Trips', 'trips'], ['currencies', 'Currencies', 'trips'], ['story', 'Our story', 'activity'], ['team', 'Team', 'team'], ['settings', 'Settings', 'settings'], ['activity', 'Activity', 'activity'], ['account', 'My account', 'account']];
  const TITLES = { overview: 'Overview', bookings: 'Booking requests', formq: 'Booking form', countries: 'Countries', currencies: 'Currencies', story: 'Our story', places: 'Places', trips: 'Trips', team: 'Team', settings: 'Settings', activity: 'Activity', account: 'My account' };
  let PLACES_ADD = false, idleT = null, countT = null, lastAct = Date.now(), actBound = false;
  const owner = () => !!ME && ME.role === 'owner';

  function startShell() {
    $('#app').innerHTML = '<div class="shell"><aside class="side" id="side"><div class="brand"><img src="' + LOGO + '" alt="Curaters"></div><nav class="nav" aria-label="Main">' +
      NAV.map((n) => '<a href="#/' + n[0] + '" data-p="' + n[0] + '">' + ico(n[2]) + '<span>' + n[1] + '</span>' + (n[0] === 'bookings' ? '<span class="count" id="cnt" hidden></span>' : '') + '</a>').join('') +
      '</nav><div class="me"><b>' + esc(ME.email) + '</b><span>' + (owner() ? 'Owner' : 'Team member') + '</span></div></aside>' +
      '<div class="main"><header class="top"><button class="btn ghost sm menu" id="menu" type="button" aria-label="Menu">' + ico('menu') + '</button><h1 id="ptitle"></h1><span class="sp"></span><button class="btn ghost sm" id="out" type="button">Sign out</button></header><main class="page" id="page"></main></div></div>';
    $('#menu').onclick = () => $('#side').classList.toggle('open');
    $('#out').onclick = () => leave('manual');
    window.onhashchange = route;
    if (!actBound) { actBound = true; ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((ev) => addEventListener(ev, () => { lastAct = Date.now(); }, { passive: true })); }
    lastAct = Date.now(); clearInterval(idleT); idleT = setInterval(() => { if (ME && Date.now() - lastAct > IDLE_MS) leave('idle'); }, 15000);
    clearInterval(countT); countT = setInterval(refreshCount, 15000); refreshCount();
    if (SIGNED_IN) { SIGNED_IN = false; rpc('log_security', { p_event: 'signin' }).catch(() => {}); }
    if (!/^#\/[a-z]/.test(location.hash)) location.hash = '#/overview'; else route();
  }
  async function leave(reason, scope) {
    clearInterval(idleT); clearInterval(countT); idleT = countT = null; window.onhashchange = null;
    try { if (ME) await Promise.race([rpc('log_security', { p_event: reason === 'idle' ? 'idle' : 'signout' }), new Promise((r) => setTimeout(r, 1500))]); } catch (e) { /* ignore */ }
    await auth.signOut(scope); ME = null; FORCE_PW = null; closeDialog();
    viewLogin(reason === 'idle' ? 'You were signed out after 20 minutes without activity.' : '');
  }
  onExpired = () => { if (ME) { clearInterval(idleT); clearInterval(countT); window.onhashchange = null; closeDialog(); viewLogin('Your session ended. Please sign in again.'); } };
  function setCount(n) { const c = $('#cnt'); if (!c) return; c.textContent = n; c.hidden = !n; }
  async function refreshCount() {
    try {
      const r = await call(SB + '/rest/v1/bookings?select=id&seen=eq.false&limit=1', { headers: { Prefer: 'count=exact' } });
      if (!r.ok) return; const m = /\/(\d+)$/.exec(r.headers.get('content-range') || ''); setCount(m ? Number(m[1]) : 0);
    } catch (e) { /* ignore */ }
  }
  const PAGES = {};
  async function route() {
    if (!ME) return;
    let p = (location.hash.match(/^#\/([a-z]+)/) || [])[1]; if (!PAGES[p]) p = 'overview';
    $$('.nav a').forEach((a) => { if (a.dataset.p === p) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    $('#ptitle').textContent = TITLES[p]; document.title = TITLES[p] + ' · Curaters'; $('#side').classList.remove('open');
    const host = $('#page'); host.innerHTML = ''; const box = document.createElement('div'); box.innerHTML = '<p class="hint">Loading…</p>'; host.appendChild(box);
    try { await PAGES[p](box); } catch (e) {
      box.innerHTML = '<div class="card"><h2>Could not load this page</h2><p>' + esc(e.message) + '</p><button class="btn" id="retry" type="button">Try again</button></div>';
      const b = $('#retry', box); if (b) b.onclick = route;
    }
  }

  /* ---------- shared pieces for the pages ---------- */
  /* writes that the database silently ignores (a row the account may not change) are reported, never shown as saved */
  async function updRows(path, json) {
    const rows = await rest(path, { method: 'PATCH', json, headers: { Prefer: 'return=representation' } });
    if (!Array.isArray(rows) || !rows.length) throw new Error('Not saved. Your account may not be allowed to change this, or it no longer exists. Reload the page and try again.');
    return rows;
  }
  async function delRows(path) {
    const rows = await rest(path, { method: 'DELETE', headers: { Prefer: 'return=representation' } });
    if (!Array.isArray(rows) || !rows.length) throw new Error('Not deleted. Your account may not be allowed to do this, or it was already removed. Reload the page and try again.');
    return rows;
  }
  const fld = (id, label, val, o) => {
    o = o || {};
    return '<div class="f' + (o.cls ? ' ' + o.cls : '') + '"><label for="' + id + '">' + label + '</label>' +
      (o.area ? '<textarea class="in" id="' + id + '" rows="' + (o.rows || 3) + '"' + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : '') + (o.attr ? ' ' + o.attr : '') + '>' + esc(val) + '</textarea>'
        : '<input class="in" id="' + id + '" type="' + (o.type || 'text') + '" value="' + esc(val) + '"' + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : '') + (o.attr ? ' ' + o.attr : '') + '>') +
      (o.help ? '<small>' + o.help + '</small>' : '') + '<p class="err" role="alert"></p></div>';
  };
  const selectOpts = (pairs, cur) => pairs.map((p) => '<option value="' + esc(p[0]) + '"' + (String(p[0]) === String(cur) ? ' selected' : '') + '>' + esc(p[1]) + '</option>').join('');
  const pill = (cls, txt, title) => '<span class="pill ' + cls + '"' + (title ? ' title="' + esc(title) + '"' : '') + '>' + esc(txt) + '</span>';
  function toJpeg(file, maxSide) {
    return new Promise((res, rej) => {
      if (!file || !/^image\//.test(file.type)) return rej(new Error('Please choose an image file.'));
      if (file.size > 15 * 1024 * 1024) return rej(new Error('That image is over 15 MB.'));
      const url = URL.createObjectURL(file), im = new Image();
      im.onerror = () => { URL.revokeObjectURL(url); rej(new Error('That file is not a valid image.')); };
      im.onload = () => {
        const s = Math.min(1, maxSide / Math.max(im.width, im.height)), c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(im.width * s)); c.height = Math.max(1, Math.round(im.height * s));
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
        c.toBlob((b) => (b ? res(b) : rej(new Error('Could not process the image.'))), 'image/jpeg', 0.84);
      };
      im.src = url;
    });
  }
  async function uploadPhoto(file, folder) {
    const blob = await toJpeg(file, 1600);
    const name = folder + '/' + (slug(String(file.name || 'photo').replace(/\.[^.]+$/, '')).slice(0, 40) || 'photo') + '-' + Date.now().toString(36) + '.jpg';
    const r = await call(SB + '/storage/v1/object/photos/' + name, { method: 'POST', body: blob, headers: { 'Content-Type': 'image/jpeg', 'x-upsert': 'false', 'cache-control': 'max-age=31536000' } });
    if (!r.ok) throw await failure(r);
    return SB + '/storage/v1/object/public/photos/' + name;
  }
  const imageField = (p, val) => '<div class="f"><span class="lbl">Photo</span><div class="imgbox"><img id="' + p + 'prev" alt="" style="visibility:hidden"><div style="flex:1"><input class="in" id="' + p + 'image" value="' + esc(val) + '" placeholder="https://… or upload a photo below"><div style="margin-top:8px"><label class="btn ghost sm">Upload a photo<input type="file" id="' + p + 'file" accept="image/jpeg,image/png,image/webp" hidden></label> <small id="' + p + 'st"></small></div></div></div><p class="err" role="alert"></p></div>';
  function bindImage(d, p, folder) {
    const inp = $('#' + p + 'image', d), prev = $('#' + p + 'prev', d), st = $('#' + p + 'st', d);
    const upd = () => { const ok = /^https?:/i.test(inp.value.trim()); prev.style.visibility = ok ? 'visible' : 'hidden'; if (ok) prev.src = inp.value.trim(); };
    inp.oninput = upd; upd();
    $('#' + p + 'file', d).onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return; st.textContent = 'Uploading…';
      try { inp.value = await uploadPhoto(f, folder); upd(); st.textContent = 'Uploaded'; } catch (x) { st.textContent = ''; toast(x.message, 'err'); }
      e.target.value = '';
    };
  }
  const tableOf = (heads, rowsHtml) => '<div class="tw"><table><thead><tr>' + heads.map((h) => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' + rowsHtml + '</tbody></table></div>';

  /* ---------- overview ---------- */
  PAGES.overview = async function (box) {
    const [bk, dest, trips] = await Promise.all([
      rest('bookings?select=id,created_at,status,seen,name,trip_title,destinations,travellers,notified_at&order=created_at.desc&limit=400'),
      rest('destinations?select=id,from_price'), rest('trips?select=id,status,price')]);
    const d30 = Date.now() - 30 * 864e5;
    const nNew = bk.filter((b) => b.status === 'new').length, unread = bk.filter((b) => !b.seen).length, last30 = bk.filter((b) => new Date(b.created_at).getTime() >= d30).length;
    const unpriced = dest.filter((d) => !(Number(d.from_price) > 5)).length, open = trips.filter((t) => t.status === 'open').length, unsent = bk.filter((b) => !b.notified_at).length;
    const months = []; const now = new Date();
    for (let i = 5; i >= 0; i--) { const m = new Date(now.getFullYear(), now.getMonth() - i, 1); months.push({ k: m.getFullYear() + '-' + m.getMonth(), l: MONTHS[m.getMonth()], n: 0 }); }
    bk.forEach((b) => { const t = new Date(b.created_at), k = t.getFullYear() + '-' + t.getMonth(), m = months.find((x) => x.k === k); if (m) m.n++; });
    const mx = Math.max(1, ...months.map((m) => m.n));
    box.innerHTML = (unsent ? '<div class="warnbox" style="margin-bottom:16px"><b>' + unsent + ' request' + (unsent > 1 ? 's have' : ' has') + ' not been emailed to the alert address yet.</b> Open <a href="#/bookings">Booking requests</a> and use "Resend alert", or check <a href="#/settings">Settings</a>.</div>' : '') +
      '<div id="mailst"></div>' +
      '<div class="grid g4" style="margin-bottom:16px">' +
      '<div class="card kpi"><span>New requests</span><b>' + nNew + '</b><small>' + unread + ' unread</small></div>' +
      '<div class="card kpi"><span>Last 30 days</span><b>' + last30 + '</b><small>trip requests</small></div>' +
      '<div class="card kpi"><span>Places</span><b>' + dest.length + '</b><small style="color:var(--muted)">' + (unpriced ? unpriced + ' without a price' : 'all priced') + '</small></div>' +
      '<div class="card kpi"><span>Open trips</span><b>' + open + '</b><small style="color:var(--muted)">of ' + trips.length + '</small></div></div>' +
      '<div class="grid g2"><div class="card"><h2>Requests per month</h2><div class="bar">' + months.map((m) => '<div><b>' + m.n + '</b><i style="height:' + Math.round(m.n / mx * 100) + '%"></i><small>' + m.l + '</small></div>').join('') + '</div></div>' +
      '<div class="card"><h2>Latest requests</h2>' + (bk.length ? '<ul class="list">' + bk.slice(0, 6).map((b) => '<li><span><b>' + esc(b.name) + '</b><br><small style="color:var(--muted)">' + esc(b.trip_title || (b.destinations || []).join(', ') || 'Custom trip') + ' · ' + esc(fmtDate(b.created_at)) + '</small></span>' + pill(b.status, (STATUSES.find((s) => s[0] === b.status) || [0, b.status])[1]) + '</li>').join('') + '</ul><p style="margin:14px 0 0"><a href="#/bookings">See all requests</a></p>' : '<p class="empty">No requests yet. They appear here the moment someone sends one on the website.</p>') + '</div></div>';
    setCount(unread);
    fn('status').then((s) => {
      const h = $('#mailst', box); if (!h) return;
      if (s && s.ok && !s.configured) h.innerHTML = '<div class="warnbox" style="margin-bottom:16px"><b>Email is not set up yet.</b> ' + (owner() ? 'Add the Brevo key in Supabase (Edge Functions, Secrets, name <code>BREVO_API_KEY</code>) so booking alerts and password emails can be sent. See Settings.' : 'Ask the owner to finish the email setup.') + '</div>';
    }).catch(() => {});
  };

  /* ---------- booking requests ---------- */
  const csvCell = (v) => { let s = String(v == null ? '' : v).replace(/\r?\n/g, ' '); if (/^[=+\-@\t]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };
  PAGES.bookings = async function (box) {
    const rows = await rest('bookings?select=*&order=created_at.desc&limit=1000');
    let q = '', st = '';
    box.innerHTML = '<div class="tools"><input class="in grow" id="bq" type="search" placeholder="Search name, email, place or reference" aria-label="Search requests"><select class="in" id="bs" aria-label="Filter by status"><option value="">All statuses</option>' + selectOpts(STATUSES, '') + '</select><button class="btn ghost" id="br" type="button">Refresh</button><button class="btn ghost" id="bx" type="button">Export CSV</button></div><div id="bt"></div>';
    const statusName = (s) => (STATUSES.find((x) => x[0] === s) || [0, s])[1];
    /* new requests appear by themselves: refresh every 10 seconds and whenever the tab is opened again */
    const reload = async () => { if (!box.isConnected || document.hidden || $('#dlg').open) return; try { const fresh = await rest('bookings?select=*&order=created_at.desc&limit=1000'); const had = new Set(rows.map((r) => r.id)); const added = fresh.filter((r) => !had.has(r.id)).length; rows.length = 0; fresh.forEach((r) => rows.push(r)); draw(); refreshCount(); if (added) toast(added + ' new request' + (added > 1 ? 's' : ''), 'ok'); } catch (e) { /* try again next time */ } };
    const liveT = setInterval(() => { if (!box.isConnected) clearInterval(liveT); else reload(); }, 10000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) reload(); });
    const draw = () => {
      const t = q.toLowerCase();
      const list = rows.filter((r) => (!st || r.status === st) && (!t || [r.id, r.name, r.email, r.phone, r.trip_title, (r.destinations || []).join(' ')].join(' ').toLowerCase().indexOf(t) >= 0));
      $('#bt', box).innerHTML = list.length ? tableOf(['Received', 'Guest', 'Trip / places', 'When', 'Status', 'Alert'], list.map((r) =>
        '<tr class="' + (r.seen ? '' : 'unread') + '" data-id="' + esc(r.id) + '" tabindex="0" style="cursor:pointer"><td>' + esc(fmtDate(r.created_at)) + '<br><small style="color:var(--muted)">' + esc(r.id) + '</small></td><td><b>' + esc(r.name) + '</b><br><small style="color:var(--muted)">' + esc(r.email) + '</small></td>' +
        '<td>' + esc(r.trip_title || (r.destinations || []).join(', ') || 'Custom trip') + '</td><td>' + esc([r.month, r.start_date ? fmtDay(r.start_date) : ''].filter(Boolean).join(' · ')) + '<br><small style="color:var(--muted)">' + esc(r.travellers) + ' traveller' + (r.travellers > 1 ? 's' : '') + (r.nights ? ' · ' + esc(r.nights) + ' nights' : '') + '</small></td>' +
        '<td>' + pill(r.status, statusName(r.status)) + '</td><td>' + (r.notified_at ? pill('confirmed', 'Sent', 'Emailed ' + fmtDate(r.notified_at)) : pill('cancelled', 'Not sent', r.notify_error || 'Waiting to be sent')) + '</td></tr>').join('')) : '<div class="card empty">No requests match.</div>';
      $$('#bt tbody tr', box).forEach((tr) => { tr.onclick = () => openBooking(tr.dataset.id); tr.onkeydown = (e) => { if (e.key === 'Enter') openBooking(tr.dataset.id); }; });
    };
    $('#bq', box).oninput = (e) => { q = e.target.value; draw(); };
    $('#bs', box).onchange = (e) => { st = e.target.value; draw(); };
    $('#br', box).onclick = async (e) => { busy(e.target, true, 'Refreshing…'); await reload(); busy(e.target, false); };
    $('#bx', box).onclick = () => {
      const head = ['Reference', 'Received', 'Status', 'Name', 'Email', 'Phone', 'Contact by', 'Trip', 'Places', 'Month', 'Start', 'End', 'Travellers', 'Nights', 'Budget USD per person', 'Style', 'Guest notes', 'Team notes', 'Alert emailed'];
      const out = [head.map(csvCell).join(',')].concat(rows.map((r) => [r.id, r.created_at, r.status, r.name, r.email, r.phone, r.contact, r.trip_title, (r.destinations || []).join('; '), r.month, r.start_date, r.end_date, r.travellers, r.nights, r.budget_usd, r.style, r.notes, r.admin_notes, r.notified_at || ''].map(csvCell).join(',')));
      download('curaters-requests-' + new Date().toISOString().slice(0, 10) + '.csv', '﻿' + out.join('\r\n'), 'text/csv'); toast('Exported ' + rows.length + ' requests', 'ok');
    };
    function openBooking(id) {
      const r = rows.find((x) => x.id === id); if (!r) return;
      const dd = (k, v) => '<dt>' + esc(k) + '</dt><dd>' + v + '</dd>';
      const body = '<dl class="dl">' + dd('Reference', esc(r.id)) + dd('Received', esc(fmtDate(r.created_at))) + dd('Name', esc(r.name)) + dd('Email', '<a href="mailto:' + esc(r.email) + '">' + esc(r.email) + '</a>') + dd('Phone', esc(r.phone || '—')) + dd('Prefers', esc(r.contact)) +
        dd('Trip', r.trip_title ? esc(r.trip_title) + (r.trip_price_usd ? ' · from ' + money(r.trip_price_usd) + ' pp' : '') : '—') + dd('Places', esc((r.destinations || []).join(', ') || '—')) +
        dd('When', esc([r.month, r.start_date ? fmtDay(r.start_date) + (r.end_date ? ' to ' + fmtDay(r.end_date) : '') : ''].filter(Boolean).join(' · ') || '—')) + dd('Travellers', esc(r.travellers) + (r.nights ? ' · ' + esc(r.nights) + ' nights' : '')) +
        dd('Budget', r.budget_usd ? money(r.budget_usd) + ' per person' : '—') + dd('Style', esc(r.style || '—')) + dd('Notes', esc(r.notes || '—').replace(/\n/g, '<br>')) +
        dd('Alert email', r.notified_at ? 'Sent ' + esc(fmtDate(r.notified_at)) : '<b style="color:var(--bad)">Not sent</b>' + (r.notify_error ? ' · ' + esc(r.notify_error) : '')) + '</dl>' +
        '<div class="row2" style="margin-top:18px"><div class="f"><label for="bst">Status</label><select class="in" id="bst">' + selectOpts(STATUSES, r.status) + '</select></div><div></div></div>' +
        '<div class="f"><label for="bnote">Team notes (private)</label><textarea class="in" id="bnote" maxlength="4000">' + esc(r.admin_notes || '') + '</textarea></div>';
      const d = openDialog('Request ' + r.id, body, '<button class="btn ghost danger-t" id="bdel" type="button">Delete</button><span style="flex:1"></span><button class="btn ghost" id="bre" type="button">Resend alert</button><a class="btn ghost" href="mailto:' + esc(r.email) + '?subject=' + encodeURIComponent('Your Curaters trip request ' + r.id) + '">Reply by email</a><button class="btn" id="bsv" type="button">Save</button>', { wide: true });
      if (!r.seen) rpc('mark_bookings_seen', { p_ids: [r.id] }).then(() => { r.seen = true; draw(); refreshCount(); }).catch(() => {});
      $('#bsv', d).onclick = async (e) => {
        busy(e.target, true, 'Saving…');
        try { const patch = { status: $('#bst', d).value, admin_notes: $('#bnote', d).value.slice(0, 4000), handled_by: ME.email }; await updRows('bookings?id=eq.' + encodeURIComponent(r.id), patch); Object.assign(r, patch); toast('Saved', 'ok'); closeDialog(); draw(); } catch (x) { busy(e.target, false); toast(x.message, 'err'); }
      };
      $('#bre', d).onclick = async (e) => {
        busy(e.target, true, 'Sending…');
        try { const j = await fn('resend', { id: r.id }); if (!j.ok) throw new Error(j.error || 'Could not send.'); toast('Alert email sent', 'ok'); const nr = await rest('bookings?id=eq.' + encodeURIComponent(r.id) + '&select=notified_at,notify_error'); if (nr && nr[0]) Object.assign(r, nr[0]); closeDialog(); draw(); }
        catch (x) { busy(e.target, false); toast(x.message, 'err'); }
      };
      $('#bdel', d).onclick = async () => {
        if (!(await confirmBox('Delete this request?', 'This permanently removes request <b>' + esc(r.id) + '</b> from ' + esc(r.name) + '. This cannot be undone.', { danger: true, ok: 'Delete request' }))) return;
        try { await delRows('bookings?id=eq.' + encodeURIComponent(r.id)); rows.splice(rows.indexOf(r), 1); toast('Request deleted', 'ok'); draw(); refreshCount(); } catch (x) { toast(x.message, 'err'); }
      };
    }
    draw();
  };

  /* ---------- places ---------- */
  const monthsHtml = (m) => '<div class="months" id="pm">' + MONTHS.map((n, i) => '<button type="button" data-v="' + m[i] + '" title="' + SEASON[m[i]] + '">' + n + '</button>').join('') + '</div><small>Click a month to change it: grey = off-season, then Fair, Good, Prime.</small>';
  const hueOf = (s) => (Array.from(String(s)).reduce((a, c) => a + c.charCodeAt(0), 0) * 37) % 360;
  PAGES.places = async function (box) {
    let [list, countries] = await Promise.all([rest('destinations?select=*&order=sort.asc,name.asc'), rest('countries?select=name&order=sort.asc,name.asc')]);
    let q = ''; const startAdd = PLACES_ADD; PLACES_ADD = false;
    box.innerHTML = '<p class="hint">Everything here shows on the website within seconds. Set a "From" price (in USD) so visitors see it, in their own currency, on each place.</p><div class="tools"><input class="in grow" id="pq" type="search" placeholder="Search places" aria-label="Search places"><select class="in" id="pc" aria-label="Filter by country"><option value="">All countries</option>' + selectOpts(countries.map((c) => [c.name, c.name]), PLACES_FILTER) + '</select><button class="btn" id="padd" type="button">+ Add a place</button></div><div id="pt"></div>';
    const draw = () => {
      const t = q.toLowerCase(), rows = list.filter((p) => (!PLACES_FILTER || p.country === PLACES_FILTER) && (!t || [p.name, p.country, p.region, p.id].join(' ').toLowerCase().indexOf(t) >= 0));
      $('#pt', box).innerHTML = rows.length ? tableOf(['Place', 'From price (USD)', 'Months', ''], rows.map((p) =>
        '<tr data-id="' + esc(p.id) + '"><td><div class="cell"><img class="thumb" alt="" src="' + esc(/^https?:/i.test(p.image) ? p.image : '') + '"' + (/^https?:/i.test(p.image) ? '' : ' style="visibility:hidden"') + '><span><b>' + esc(p.name) + '</b><small>' + esc([p.region, p.country].filter(Boolean).join(', ') || '—') + '</small></span></div></td>' +
        '<td><input class="in price-in" type="number" min="0" step="1" inputmode="numeric" aria-label="From price for ' + esc(p.name) + '" value="' + (p.from_price == null ? '' : esc(p.from_price)) + '" placeholder="not set"></td>' +
        '<td><span style="letter-spacing:.06em">' + String(p.months || '').split('').map((v) => ['·', '○', '◐', '●'][v] || '·').join('') + '</span></td>' +
        '<td><div class="acts"><button class="btn ghost sm" data-e type="button">Edit</button><button class="btn ghost sm danger-t" data-x type="button">Delete</button></div></td></tr>').join('')) : '<div class="card empty">No places match.</div>';
      $$('#pt tbody tr', box).forEach((tr) => {
        const p = list.find((x) => x.id === tr.dataset.id);
        $('[data-e]', tr).onclick = () => placeDialog(p);
        $('[data-x]', tr).onclick = () => delPlace(p);
        const inp = $('.price-in', tr);
        inp.onchange = async () => {
          const v = num(inp.value); if (Number.isNaN(v) || (v !== null && v < 0)) { toast('Enter a price in USD, or leave it empty', 'err'); inp.value = p.from_price == null ? '' : p.from_price; return; }
          try { await updRows('destinations?id=eq.' + encodeURIComponent(p.id), { from_price: v }); p.from_price = v; toast(p.name + ': price saved', 'ok'); } catch (x) { toast(x.message, 'err'); inp.value = p.from_price == null ? '' : p.from_price; }
        };
      });
    };
    async function delPlace(p) {
      if (!(await confirmBox('Delete ' + p.name + '?', 'It disappears from the website straight away. Trip requests that already mention it are kept.', { danger: true, ok: 'Delete place', typed: p.name }))) return;
      try {
        await delRows('destinations?id=eq.' + encodeURIComponent(p.id));
        try { const s = await rest('settings?id=eq.1&select=featured'); const f = ((s && s[0] && s[0].featured) || []).filter((x) => x !== p.id); await updRows('settings?id=eq.1', { featured: f }); } catch (x) { /* optional */ }
        list = list.filter((x) => x.id !== p.id); toast(p.name + ' deleted', 'ok'); draw();
      } catch (x) { toast(x.message, 'err'); }
    }
    function placeDialog(p) {
      const isNew = !p; p = p || { id: '', name: '', tags: [], months: '222222222222', facts: {}, tz: 'Africa/Accra', currency: 'USD' };
      const facts = Object.keys(p.facts || {}).map((k) => k + ': ' + p.facts[k]).join('\n');
      const body = '<div class="row2">' + fld('p_name', 'Place name', p.name, { attr: 'maxlength="120"' }) + (isNew ? fld('p_id', 'Web name (for the link)', p.id, { ph: 'filled in from the name', attr: 'maxlength="60"', help: 'Letters, numbers and dashes. Cannot be changed later.' }) : '<div class="f"><span class="lbl">Web name</span><div class="code" style="font-size:.9rem;letter-spacing:.02em;padding:10px">' + esc(p.id) + '</div></div>') + '</div>' +
        '<div class="row3">' + '<div class="f"><label for="p_country">Country</label><select class="in" id="p_country">' + selectOpts([['', 'Choose a country']].concat(countries.map((c) => [c.name, c.name])).concat(p.country && !countries.some((c) => c.name === p.country) ? [[p.country, p.country]] : []), p.country || (isNew ? PLACES_FILTER : '')) + '</select><small>Need a new country? Add it on the Countries page first.</small><p class="err" role="alert"></p></div>' + fld('p_region', 'Region / area', p.region || '', { attr: 'maxlength="60"' }) + fld('p_duration', 'Suggested stay', p.duration || '', { ph: 'e.g. 3 to 5 days', attr: 'maxlength="60"' }) + '</div>' +
        fld('p_tagline', 'One-line tagline', p.tagline || '', { attr: 'maxlength="200"' }) + fld('p_desc', 'Description', p.description || '', { area: true, rows: 5, attr: 'maxlength="4000"' }) +
        '<div class="row3">' + fld('p_price', 'From price (USD per person)', p.from_price == null ? '' : p.from_price, { type: 'number', attr: 'min="0" step="1"', help: '5 or less shows "Price on request".' }) + fld('p_lat', 'Latitude', p.lat == null ? '' : p.lat, { type: 'number', attr: 'step="any"', help: 'For live weather and sunrise.' }) + fld('p_lon', 'Longitude', p.lon == null ? '' : p.lon, { type: 'number', attr: 'step="any"' }) + '</div>' +
        '<div class="f"><span class="lbl">Themes</span><div class="chips" id="p_tags">' + THEMES.map((t) => '<label><input type="checkbox" value="' + t[0] + '"' + ((p.tags || []).indexOf(t[0]) >= 0 ? ' checked' : '') + '> ' + esc(t[1]) + '</label>').join('') + '</div></div>' +
        '<div class="f"><span class="lbl">Best time to go</span>' + monthsHtml(String(p.months || '222222222222')) + '</div>' +
        '<div class="row2">' + fld('p_high', 'Highlights (one per line)', (p.highlights || []).join('\n'), { area: true, rows: 5 }) + fld('p_act', 'Things to do (one per line)', (p.activities || []).join('\n'), { area: true, rows: 5 }) + '</div>' +
        fld('p_facts', 'Quick facts (one per line, like "Best for: Families")', facts, { area: true, rows: 4 }) + imageField('p_', p.image || '') + fld('p_alt', 'Photo description (for screen readers)', p.alt || '', { attr: 'maxlength="300"' }) +
        '<details class="adv"><summary>More options</summary><div class="row3" style="margin-top:12px">' + fld('p_tz', 'Time zone', p.tz || 'Africa/Accra', { attr: 'maxlength="60"' }) + fld('p_cur', 'Local currency code', p.currency || 'USD', { attr: 'maxlength="3"' }) + fld('p_hue', 'Card colour (0 to 360)', p.hue == null ? '' : p.hue, { type: 'number', attr: 'min="0" max="360"' }) + '</div>' +
        fld('p_credit', 'Photo credits (one per line)', (p.credit || []).join('\n'), { area: true, rows: 2 }) + fld('p_wiki', 'Wikipedia page titles (one per line)', (p.wiki || []).join('\n'), { area: true, rows: 2 }) + fld('p_files', 'Gallery file names (one per line)', (p.files || []).join('\n'), { area: true, rows: 2 }) + '</details>';
      const d = openDialog(isNew ? 'Add a place' : 'Edit ' + p.name, body, '<button class="btn ghost" id="pcancel" type="button">Cancel</button><button class="btn" id="psave" type="button">' + (isNew ? 'Add place' : 'Save changes') + '</button>', { wide: true });
      bindImage(d, 'p_', 'places');
      $$('#pm button', d).forEach((b) => { b.onclick = () => { const v = (Number(b.dataset.v) + 1) % 4; b.dataset.v = v; b.title = SEASON[v]; }; });
      if (isNew) { const n = $('#p_name', d), i = $('#p_id', d); n.oninput = () => { if (!i.dataset.touched) i.placeholder = slug(n.value) || 'filled in from the name'; }; i.oninput = () => { i.dataset.touched = '1'; }; }
      $('#pcancel', d).onclick = closeDialog;
      $('#psave', d).onclick = async (e) => {
        const val = (id) => $('#' + id, d).value.trim(); let bad = '';
        const fail = (id, m) => { if (!bad) { bad = m; const el = $('#' + id, d); setErr(el, m); el.focus(); } };
        $$('.in', d).forEach((el) => setErr(el, ''));
        const name = val('p_name'); if (!name || name.length > 120) fail('p_name', 'Enter the place name (up to 120 characters).'); if (!val('p_country')) fail('p_country', 'Choose a country for this place.');
        const id = isNew ? (val('p_id') || slug(name)) : p.id; if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id) || id.length > 60) fail(isNew ? 'p_id' : 'p_name', 'The web name can only use small letters, numbers and dashes.');
        const price = num(val('p_price')); if (Number.isNaN(price) || (price !== null && (price < 0 || price > 99999999))) fail('p_price', 'Enter a price in USD, or leave it empty.');
        if ($('#p_desc', d).value.length > 4000) fail('p_desc', 'The description can be up to 4000 characters.');
        const lat = num(val('p_lat')), lon = num(val('p_lon')); if (Number.isNaN(lat) || (lat !== null && Math.abs(lat) > 90)) fail('p_lat', 'Latitude must be between -90 and 90.'); if (Number.isNaN(lon) || (lon !== null && Math.abs(lon) > 180)) fail('p_lon', 'Longitude must be between -180 and 180.');
        if ((lat === null) !== (lon === null)) fail('p_lat', 'Give both latitude and longitude, or leave both empty.');
        const cur = (val('p_cur') || 'USD').toUpperCase(); if (!/^[A-Z]{3}$/.test(cur)) fail('p_cur', 'Use a 3-letter currency code, like USD.');
        const image = val('p_image'); if (!imgOk(image)) fail('p_image', 'The photo must be a web address starting with https:// (or upload one).');
        const hue = num(val('p_hue')); if (Number.isNaN(hue) || (hue !== null && (hue < 0 || hue > 360))) fail('p_hue', 'Use a number from 0 to 360.');
        if (bad) { toast(bad, 'err'); return; }
        const fobj = {}; lines($('#p_facts', d).value).forEach((l) => { const i = l.indexOf(':'); if (i > 0) fobj[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
        const payload = { name, country: val('p_country'), region: val('p_region'), tagline: val('p_tagline'), description: $('#p_desc', d).value.trim(), duration: val('p_duration'), from_price: price, lat, lon, tz: val('p_tz') || 'Africa/Accra', currency: cur,
          tags: $$('#p_tags input:checked', d).map((c) => c.value), highlights: lines($('#p_high', d).value), activities: lines($('#p_act', d).value), facts: fobj, months: $$('#pm button', d).map((b) => b.dataset.v).join(''),
          image, alt: val('p_alt'), credit: lines($('#p_credit', d).value), wiki: lines($('#p_wiki', d).value), files: lines($('#p_files', d).value), hue: hue == null ? (p.hue == null ? hueOf(id) : p.hue) : Math.round(hue) };
        busy(e.target, true, 'Saving…');
        try {
          let saved;
          if (isNew) { payload.id = id; payload.sort = list.reduce((m, x) => Math.max(m, x.sort || 0), 0) + 10; saved = await rest('destinations', { method: 'POST', json: payload, headers: { Prefer: 'return=representation' } }); }
          else saved = await updRows('destinations?id=eq.' + encodeURIComponent(p.id), payload);
          const row = saved && saved[0] ? saved[0] : Object.assign({}, p, payload);
          if (isNew) list.push(row); else list[list.indexOf(p)] = row;
          closeDialog(); toast(isNew ? name + ' added to the website' : name + ' updated', 'ok'); draw();
        } catch (x) { busy(e.target, false); toast(x.status === 409 || x.code === '23505' ? 'A place with that web name already exists. Change the web name.' : x.message, 'err'); }
      };
    }
    $('#pq', box).oninput = (e) => { q = e.target.value; draw(); };
    $('#pc', box).onchange = (e) => { PLACES_FILTER = e.target.value; draw(); };
    $('#padd', box).onclick = () => placeDialog(null);
    draw(); if (startAdd) placeDialog(null);
  };

  /* ---------- trips ---------- */
  PAGES.trips = async function (box) {
    const [trips0, places] = await Promise.all([rest('trips?select=*&order=sort.asc,id.asc'), rest('destinations?select=id,name&order=name.asc')]);
    let list = trips0;
    box.innerHTML = '<p class="hint">Trips and their prices (USD). Change a price or status right in the table; it updates the website at once.</p><div class="tools"><span class="grow"></span><button class="btn" id="tadd" type="button">+ Add a trip</button></div><div id="tt"></div>';
    const draw = () => {
      $('#tt', box).innerHTML = list.length ? tableOf(['Trip', 'Type', 'Price (USD)', 'Status', ''], list.map((t) =>
        '<tr data-id="' + t.id + '"><td><div class="cell"><img class="thumb" alt="" src="' + esc(/^https?:/i.test(t.image) ? t.image : '') + '"' + (/^https?:/i.test(t.image) ? '' : ' style="visibility:hidden"') + '><span><b>' + esc(t.title) + '</b><small>' + esc(t.place || '—') + '</small></span></div></td><td>' + esc(TYPES[t.type] || t.type) + '</td>' +
        '<td><input class="in price-in" type="number" min="0" step="1" aria-label="Price for ' + esc(t.title) + '" value="' + esc(t.price) + '"></td><td><select class="in" aria-label="Status for ' + esc(t.title) + '">' + selectOpts(TRIP_STATUS, t.status) + '</select></td>' +
        '<td><div class="acts"><button class="btn ghost sm" data-e type="button">Edit</button><button class="btn ghost sm danger-t" data-x type="button">Delete</button></div></td></tr>').join('')) : '<div class="card empty">No trips yet.</div>';
      $$('#tt tbody tr', box).forEach((tr) => {
        const t = list.find((x) => String(x.id) === tr.dataset.id), pr = $('.price-in', tr), sel = $('select', tr);
        const save = async (patch, ok, undo) => { try { await updRows('trips?id=eq.' + t.id, patch); Object.assign(t, patch); toast(ok, 'ok'); } catch (x) { toast(x.message, 'err'); undo(); } };
        pr.onchange = () => { const v = num(pr.value); if (v === null || Number.isNaN(v) || v < 0) { toast('Enter a price in USD (0 for "Price on request")', 'err'); pr.value = t.price; return; } save({ price: v }, t.title + ': price saved', () => { pr.value = t.price; }); };
        sel.onchange = () => save({ status: sel.value }, t.title + ': status saved', () => { sel.value = t.status; });
        $('[data-e]', tr).onclick = () => tripDialog(t);
        $('[data-x]', tr).onclick = async () => {
          if (!(await confirmBox('Delete ' + t.title + '?', 'It disappears from the website straight away.', { danger: true, ok: 'Delete trip' }))) return;
          try { await delRows('trips?id=eq.' + t.id); list = list.filter((x) => x !== t); toast('Trip deleted', 'ok'); draw(); } catch (x) { toast(x.message, 'err'); }
        };
      });
    };
    function tripDialog(t) {
      const isNew = !t; t = t || { type: 'day', status: 'open', price: 0 };
      const body = '<div class="row2">' + fld('t_title', 'Trip title', t.title || '', { attr: 'maxlength="140"' }) + '<div class="f"><label for="t_type">Type</label><select class="in" id="t_type">' + selectOpts(Object.keys(TYPES).map((k) => [k, TYPES[k]]), t.type) + '</select></div></div>' +
        '<div class="row2">' + fld('t_place', 'Where (text shown on the card)', t.place || '', { attr: 'maxlength="140"' }) + '<div class="f"><label for="t_dest">Linked place (optional)</label><select class="in" id="t_dest"><option value="">None</option>' + selectOpts(places.map((p) => [p.id, p.name]), t.dest || '') + '</select></div></div>' +
        fld('t_blurb', 'Short description', t.blurb || '', { area: true, rows: 2, attr: 'maxlength="1000"' }) + fld('t_details', 'Full details', t.details || '', { area: true, rows: 5, attr: 'maxlength="6000"' }) +
        '<div class="row3">' + fld('t_price', 'Price (USD per person)', t.price == null ? 0 : t.price, { type: 'number', attr: 'min="0" step="1"', help: '5 or less shows "Price on request".' }) + fld('t_min', 'Min guests', t.min_guests == null ? '' : t.min_guests, { type: 'number', attr: 'min="1"' }) + fld('t_max', 'Max guests', t.max_guests == null ? '' : t.max_guests, { type: 'number', attr: 'min="1"' }) + '</div>' +
        '<div class="row2">' + fld('t_slots', 'Places left (optional)', t.slots == null ? '' : t.slots, { type: 'number', attr: 'min="0"' }) + '<div class="f"><label for="t_status">Status</label><select class="in" id="t_status">' + selectOpts(TRIP_STATUS, t.status) + '</select></div></div>' +
        imageField('t_', t.image || '') + fld('t_link', 'More-details link (optional)', t.link || '', { ph: 'https://…', help: 'Shows as "Original details" on the trip card.' }) + fld('t_video', 'Video link (optional)', t.video || '', { ph: 'https://…' });
      const d = openDialog(isNew ? 'Add a trip' : 'Edit ' + t.title, body, '<button class="btn ghost" id="tcancel" type="button">Cancel</button><button class="btn" id="tsave" type="button">' + (isNew ? 'Add trip' : 'Save changes') + '</button>', { wide: true });
      bindImage(d, 't_', 'trips'); $('#tcancel', d).onclick = closeDialog;
      $('#tsave', d).onclick = async (e) => {
        const val = (id) => $('#' + id, d).value.trim(); let bad = '';
        const fail = (id, m) => { if (!bad) { bad = m; const el = $('#' + id, d); setErr(el, m); el.focus(); } };
        $$('.in', d).forEach((el) => setErr(el, ''));
        const title = val('t_title'); if (!title || title.length > 140) fail('t_title', 'Enter the trip title (up to 140 characters).');
        const price = num(val('t_price')); if (price === null || Number.isNaN(price) || price < 0 || price > 99999999) fail('t_price', 'Enter a price in USD (0 for "Price on request").');
        const mn = num(val('t_min')), mx = num(val('t_max')), sl = num(val('t_slots'));
        [['t_min', mn], ['t_max', mx], ['t_slots', sl]].forEach((a) => { if (Number.isNaN(a[1]) || (a[1] !== null && a[1] < 0)) fail(a[0], 'Enter a whole number, or leave it empty.'); });
        if (mn !== null && mx !== null && mn > mx) fail('t_min', 'Min guests cannot be more than max guests.');
        const image = val('t_image'); if (!imgOk(image)) fail('t_image', 'The photo must be a web address starting with https:// (or upload one).');
        const video = val('t_video'); if (video && !/^https?:\/\//i.test(video)) fail('t_video', 'The video link must start with https://'); const link = val('t_link'); if (link && !/^https?:\/\//i.test(link)) fail('t_link', 'The link must start with https://');
        if (bad) { toast(bad, 'err'); return; }
        const payload = { type: val('t_type'), title, place: val('t_place'), dest: val('t_dest') || null, blurb: $('#t_blurb', d).value.trim(), details: $('#t_details', d).value.trim(), slots: sl === null ? null : Math.round(sl), min_guests: mn === null ? null : Math.round(mn), max_guests: mx === null ? null : Math.round(mx), price, status: val('t_status'), image, video, link };
        busy(e.target, true, 'Saving…');
        try {
          let saved;
          if (isNew) { payload.sort = list.reduce((m, x) => Math.max(m, x.sort || 0), 0) + 10; saved = await rest('trips', { method: 'POST', json: payload, headers: { Prefer: 'return=representation' } }); }
          else saved = await updRows('trips?id=eq.' + t.id, payload);
          const row = saved && saved[0] ? saved[0] : Object.assign({}, t, payload);
          if (isNew) list.push(row); else list[list.indexOf(t)] = row;
          closeDialog(); toast(isNew ? 'Trip added to the website' : 'Trip updated', 'ok'); draw();
        } catch (x) { busy(e.target, false); toast(x.message, 'err'); }
      };
    }
    $('#tadd', box).onclick = () => tripDialog(null);
    draw();
  };


  /* ---------- our story: mission, vision, why ---------- */
  const STORY = [['mission', 'Our mission'], ['vision', 'Our vision'], ['why', 'Why we do it']];
  PAGES.story = async function (box) {
    const rows = await rest('site_content?select=*'), by = {}; rows.forEach((r) => { by[r.key] = r; });
    box.innerHTML = '<p class="hint">These three texts show in the "Our purpose" section of the website (the vision also appears in the page footer). Changes show on the website within about a minute.</p>' +
      STORY.map((s) => '<div class="card"><h2>' + esc(s[1]) + '</h2>' + fld('s_t_' + s[0], 'Heading', (by[s[0]] || {}).title || s[1], { attr: 'maxlength="80"' }) + fld('s_b_' + s[0], 'Text', (by[s[0]] || {}).body || '', { area: true, rows: 4, attr: 'maxlength="2000"' }) + '<button class="btn" data-k="' + s[0] + '" type="button">Save ' + esc(s[1].toLowerCase()) + '</button></div>').join('');
    $$('button[data-k]', box).forEach((b) => {
      b.onclick = async () => {
        const k = b.dataset.k, t = $('#s_t_' + k, box), x = $('#s_b_' + k, box);
        setErr(t, ''); setErr(x, '');
        if (!t.value.trim()) { setErr(t, 'Enter a heading.'); t.focus(); return; }
        if (!x.value.trim()) { setErr(x, 'Enter the text.'); x.focus(); return; }
        busy(b, true, 'Saving…');
        try {
          await rest('site_content?on_conflict=key', { method: 'POST', json: { key: k, title: t.value.trim().slice(0, 80), body: x.value.trim().slice(0, 2000), updated_at: new Date().toISOString() }, headers: { Prefer: 'resolution=merge-duplicates,return=representation' } });
          toast('Saved. It will show on the website shortly.', 'ok');
        } catch (e) { toast(e.message, 'err'); }
        busy(b, false);
      };
    });
  };

  /* ---------- countries ---------- */
  let PLACES_FILTER = '';
  PAGES.countries = async function (box) {
    let [list, places] = await Promise.all([rest('countries?select=*&order=sort.asc,name.asc'), rest('destinations?select=id,country')]);
    const count = (n) => places.filter((p) => p.country === n).length;
    box.innerHTML = '<p class="hint">Visitors choose a country on the website and see its places. Add a country here, then add its places. Removing a country also removes its places from the website.</p><div class="tools"><span class="grow"></span><button class="btn" id="cadd" type="button">+ Add a country</button></div><div id="ct"></div>';
    const draw = () => {
      $('#ct', box).innerHTML = list.length ? tableOf(['Country', 'Places', ''], list.map((c) =>
        '<tr data-id="' + esc(c.id) + '"><td><b>' + esc(c.name) + '</b></td><td>' + count(c.name) + '</td><td><div class="acts"><button class="btn ghost sm" data-m type="button">Places</button><button class="btn ghost sm" data-a type="button">+ Add place</button><button class="btn ghost sm danger-t" data-x type="button">Remove</button></div></td></tr>').join('')) : '<div class="card empty">No countries yet.</div>';
      $$('#ct tbody tr', box).forEach((tr) => {
        const c = list.find((x) => x.id === tr.dataset.id);
        $('[data-m]', tr).onclick = () => { PLACES_FILTER = c.name; location.hash = '#/places'; };
        $('[data-a]', tr).onclick = () => { PLACES_FILTER = c.name; PLACES_ADD = true; location.hash = '#/places'; };
        $('[data-x]', tr).onclick = async () => {
          const n = count(c.name);
          if (!(await confirmBox('Remove ' + c.name + '?', 'This removes ' + esc(c.name) + (n ? ' and its <b>' + n + '</b> place' + (n > 1 ? 's' : '') : '') + ' from the website. Trip requests that already mention them are kept.', { danger: true, ok: 'Remove country', typed: c.name }))) return;
          try {
            if (n) await rest('destinations?country=eq.' + encodeURIComponent(c.name), { method: 'DELETE', headers: { Prefer: 'return=minimal' } });
            await delRows('countries?id=eq.' + encodeURIComponent(c.id));
            list = list.filter((x) => x !== c); places = places.filter((p) => p.country !== c.name); toast(c.name + ' removed', 'ok'); draw();
          } catch (e) { toast(e.message, 'err'); }
        };
      });
    };
    $('#cadd', box).onclick = () => {
      const d = openDialog('Add a country', fld('c_name', 'Country name', '', { attr: 'maxlength="80"', ph: 'e.g. Nigeria' }), '<button class="btn ghost" id="cc" type="button">Cancel</button><button class="btn" id="cs" type="button">Add country</button>', { small: true });
      $('#cc', d).onclick = closeDialog;
      $('#cs', d).onclick = async (e) => {
        const el = $('#c_name', d), name = el.value.trim(); setErr(el, '');
        if (!name || name.length > 80) { setErr(el, 'Enter the country name.'); el.focus(); return; }
        if (list.some((c) => c.name.toLowerCase() === name.toLowerCase())) { setErr(el, 'That country is already in the list.'); el.focus(); return; }
        const id = slug(name); if (!id) { setErr(el, 'Use letters or numbers in the name.'); return; }
        busy(e.target, true, 'Adding…');
        try {
          const r = await rest('countries', { method: 'POST', json: { id, name, sort: list.reduce((m, x) => Math.max(m, x.sort || 0), 0) + 10 }, headers: { Prefer: 'return=representation' } });
          list.push(r && r[0] ? r[0] : { id, name, sort: 0 }); closeDialog(); toast(name + ' added. Now add its places.', 'ok'); draw();
        } catch (x) { busy(e.target, false); toast(x.status === 409 || x.code === '23505' ? 'That country already exists.' : x.message, 'err'); }
      };
    };
    draw();
  };

  /* ---------- currencies ---------- */
  PAGES.currencies = async function (box) {
    let list = await rest('currencies?select=*&order=sort.asc,code.asc');
    box.innerHTML = '<p class="hint">Visitors can switch the website prices between these currencies. All prices you enter are in US dollars. The rate is how many units of the currency equal <b>1 US dollar</b>. Update the rates whenever they change.</p><div class="tools"><span class="grow"></span><button class="btn" id="cuadd" type="button">+ Add a currency</button></div><div id="cut"></div>';
    const draw = () => {
      $('#cut', box).innerHTML = tableOf(['Code', 'Name', 'Symbol', 'Rate per 1 USD', 'Shown', ''], list.map((c) =>
        '<tr data-id="' + esc(c.code) + '"><td><b>' + esc(c.code) + '</b></td><td>' + esc(c.name) + '</td><td>' + esc(c.symbol) + '</td>' +
        '<td><input class="in price-in" type="number" min="0" step="any" aria-label="Rate for ' + esc(c.code) + '" value="' + esc(c.rate) + '"' + (c.code === 'USD' ? ' disabled' : '') + '></td>' +
        '<td><input type="checkbox" class="act" aria-label="Show ' + esc(c.code) + '"' + (c.active ? ' checked' : '') + (c.code === 'USD' ? ' disabled' : '') + '></td>' +
        '<td><div class="acts">' + (c.code === 'USD' ? '' : '<button class="btn ghost sm danger-t" data-x type="button">Remove</button>') + '</div></td></tr>').join(''));
      $$('#cut tbody tr', box).forEach((tr) => {
        const c = list.find((x) => x.code === tr.dataset.id), r = $('.price-in', tr), a = $('.act', tr), x = $('[data-x]', tr);
        r.onchange = async () => { const v = num(r.value); if (v === null || Number.isNaN(v) || v <= 0) { toast('Enter a rate above 0', 'err'); r.value = c.rate; return; } try { await updRows('currencies?code=eq.' + c.code, { rate: v }); c.rate = v; toast(c.code + ' rate saved', 'ok'); } catch (e) { toast(e.message, 'err'); r.value = c.rate; } };
        a.onchange = async () => { try { await updRows('currencies?code=eq.' + c.code, { active: a.checked }); c.active = a.checked; toast(c.code + (a.checked ? ' shown' : ' hidden'), 'ok'); } catch (e) { toast(e.message, 'err'); a.checked = c.active; } };
        if (x) x.onclick = async () => { if (!(await confirmBox('Remove ' + c.code + '?', 'Visitors will no longer see ' + esc(c.name) + ' on the website.', { danger: true, ok: 'Remove' }))) return; try { await delRows('currencies?code=eq.' + c.code); list = list.filter((y) => y !== c); toast(c.code + ' removed', 'ok'); draw(); } catch (e) { toast(e.message, 'err'); } };
      });
    };
    $('#cuadd', box).onclick = () => {
      const d = openDialog('Add a currency', '<div class="row2">' + fld('u_code', 'Code (3 letters)', '', { attr: 'maxlength="3"', ph: 'e.g. UGX' }) + fld('u_sym', 'Symbol', '', { attr: 'maxlength="6"', ph: 'e.g. USh' }) + '</div>' + fld('u_name', 'Name', '', { attr: 'maxlength="40"', ph: 'e.g. Ugandan shilling' }) + fld('u_rate', 'Rate: how many of this currency equal 1 US dollar', '', { type: 'number', attr: 'min="0" step="any"' }), '<button class="btn ghost" id="uc" type="button">Cancel</button><button class="btn" id="us" type="button">Add currency</button>', { small: true });
      $('#uc', d).onclick = closeDialog;
      $('#us', d).onclick = async (e) => {
        $$('.in', d).forEach((el) => setErr(el, ''));
        const code = $('#u_code', d).value.trim().toUpperCase(), rate = num($('#u_rate', d).value);
        if (!/^[A-Z]{3}$/.test(code)) { setErr($('#u_code', d), 'Use exactly 3 letters.'); return; }
        if (list.some((c) => c.code === code)) { setErr($('#u_code', d), 'That currency is already in the list.'); return; }
        if (rate === null || Number.isNaN(rate) || rate <= 0) { setErr($('#u_rate', d), 'Enter a rate above 0.'); return; }
        busy(e.target, true, 'Adding…');
        try {
          const r = await rest('currencies', { method: 'POST', json: { code, name: $('#u_name', d).value.trim().slice(0, 40), symbol: $('#u_sym', d).value.trim().slice(0, 6), rate, sort: list.reduce((m, x) => Math.max(m, x.sort || 0), 0) + 10, active: true }, headers: { Prefer: 'return=representation' } });
          list.push(r && r[0] ? r[0] : { code, name: '', symbol: '', rate, active: true }); closeDialog(); toast(code + ' added', 'ok'); draw();
        } catch (x) { busy(e.target, false); toast(x.message, 'err'); }
      };
    };
    draw();
  };

  /* ---------- booking form questions ---------- */
  const QKINDS = { text: 'Short answer', textarea: 'Long answer', select: 'Dropdown list', yesno: 'Yes / No' };
  PAGES.formq = async function (box) {
    let list = await rest('form_questions?select=*&order=sort.asc,id.asc');
    box.innerHTML = '<p class="hint">These are the questions on the website booking form. Switch a question off to remove it from the form, rename it, or add your own questions (they appear in the last section of the form). Questions marked "always" are needed to handle a request and cannot be removed. Answers to your own questions arrive in the guest notes of each booking request.</p><div class="tools"><span class="grow"></span><button class="btn" id="qadd" type="button">+ Add a question</button></div><div id="qt"></div>';
    const custom = () => list.filter((q) => q.kind !== 'builtin');
    const draw = () => {
      $('#qt', box).innerHTML = tableOf(['Question', 'Type', 'Required', 'On the form', ''], list.map((q) => {
        const cs = custom(), ci = cs.indexOf(q);
        return '<tr data-id="' + esc(q.id) + '"><td><input class="in q-label" maxlength="120" aria-label="Question text" value="' + esc(q.label) + '"></td>' +
          '<td>' + (q.kind === 'builtin' ? 'Built-in' : esc(QKINDS[q.kind] || q.kind)) + (q.kind === 'select' ? '<br><small style="color:var(--muted)">' + esc((q.options || []).join(', ')) + '</small>' : '') + '</td>' +
          '<td>' + (q.kind === 'builtin' ? (q.required ? 'Yes' : 'No') : '<input type="checkbox" class="q-req" aria-label="Required"' + (q.required ? ' checked' : '') + '>') + '</td>' +
          '<td>' + (q.locked ? '<small style="color:var(--muted)">Always</small>' : '<input type="checkbox" class="q-on" aria-label="Show on the form"' + (q.active ? ' checked' : '') + '>') + '</td>' +
          '<td><div class="acts">' + (q.kind !== 'builtin' ? '<button class="btn ghost sm" data-u type="button"' + (ci <= 0 ? ' disabled' : '') + ' aria-label="Move up">▲</button><button class="btn ghost sm" data-d type="button"' + (ci >= cs.length - 1 ? ' disabled' : '') + ' aria-label="Move down">▼</button><button class="btn ghost sm danger-t" data-x type="button">Delete</button>' : '') + '</div></td></tr>';
      }).join(''));
      $$('#qt tbody tr', box).forEach((tr) => {
        const q = list.find((x) => x.id === tr.dataset.id), lab = $('.q-label', tr), on = $('.q-on', tr), rq = $('.q-req', tr);
        const save = async (patch, ok, undo) => { try { await updRows('form_questions?id=eq.' + encodeURIComponent(q.id), patch); Object.assign(q, patch); toast(ok, 'ok'); } catch (e) { toast(e.message, 'err'); undo(); } };
        lab.onchange = () => { const v = lab.value.trim(); if (!v) { toast('A question needs some text', 'err'); lab.value = q.label; return; } save({ label: v.slice(0, 120) }, 'Question renamed', () => { lab.value = q.label; }); };
        if (on) on.onchange = () => save({ active: on.checked }, on.checked ? 'Question is on the form' : 'Question removed from the form', () => { on.checked = q.active; });
        if (rq) rq.onchange = () => save({ required: rq.checked }, rq.checked ? 'Now required' : 'Now optional', () => { rq.checked = q.required; });
        const swap = async (dir) => {
          const cs = custom(), i = cs.indexOf(q), o = cs[i + dir]; if (!o) return;
          try { await Promise.all([updRows('form_questions?id=eq.' + encodeURIComponent(q.id), { sort: o.sort }), updRows('form_questions?id=eq.' + encodeURIComponent(o.id), { sort: q.sort })]); const s = q.sort; q.sort = o.sort; o.sort = s; list.sort((a, b) => a.sort - b.sort); draw(); } catch (e) { toast(e.message, 'err'); }
        };
        const u = $('[data-u]', tr), dn = $('[data-d]', tr), x = $('[data-x]', tr);
        if (u) u.onclick = () => swap(-1); if (dn) dn.onclick = () => swap(1);
        if (x) x.onclick = async () => { if (!(await confirmBox('Delete this question?', 'It is removed from the booking form. Answers already received are kept in the requests.', { danger: true, ok: 'Delete question' }))) return; try { await delRows('form_questions?id=eq.' + encodeURIComponent(q.id)); list = list.filter((y) => y !== q); toast('Question deleted', 'ok'); draw(); } catch (e) { toast(e.message, 'err'); } };
      });
    };
    $('#qadd', box).onclick = () => {
      const d = openDialog('Add a question', fld('q_label', 'Question', '', { attr: 'maxlength="120"', ph: 'e.g. How did you hear about Curaters?' }) +
        '<div class="f"><label for="q_kind">Answer type</label><select class="in" id="q_kind">' + selectOpts(Object.keys(QKINDS).map((k) => [k, QKINDS[k]]), 'text') + '</select></div>' +
        '<div id="q_optw" hidden>' + fld('q_opts', 'Choices (one per line)', '', { area: true, rows: 4 }) + '</div>' +
        '<div class="f"><label><input type="checkbox" id="q_req"> Guests must answer this</label></div>', '<button class="btn ghost" id="qc" type="button">Cancel</button><button class="btn" id="qs" type="button">Add question</button>', { small: true });
      $('#q_kind', d).onchange = () => { $('#q_optw', d).hidden = $('#q_kind', d).value !== 'select'; };
      $('#qc', d).onclick = closeDialog;
      $('#qs', d).onclick = async (e) => {
        $$('.in', d).forEach((el) => setErr(el, ''));
        const label = $('#q_label', d).value.trim(), kind = $('#q_kind', d).value, opts = lines($('#q_opts', d).value).slice(0, 20);
        if (!label || label.length > 120) { setErr($('#q_label', d), 'Enter the question (up to 120 characters).'); return; }
        if (kind === 'select' && opts.length < 2) { setErr($('#q_opts', d), 'Give at least two choices, one per line.'); return; }
        const id = ('q-' + (slug(label).slice(0, 40) || 'question') + '-' + Math.random().toString(36).slice(2, 6)).slice(0, 60);
        busy(e.target, true, 'Adding…');
        try {
          const r = await rest('form_questions', { method: 'POST', json: { id, label, kind, options: kind === 'select' ? opts : [], required: $('#q_req', d).checked, active: true, locked: false, sort: list.reduce((m, x) => Math.max(m, x.sort || 0), 0) + 10 }, headers: { Prefer: 'return=representation' } });
          list.push(r && r[0] ? r[0] : { id, label, kind, options: opts, required: false, active: true, locked: false, sort: 999 }); closeDialog(); toast('Question added to the booking form', 'ok'); draw();
        } catch (x) { busy(e.target, false); toast(x.message, 'err'); }
      };
    };
    draw();
  };


  /* ---------- team ---------- */
  const badges = (r) => {
    if (!r.joined) return pill('off', 'No login yet');
    if (r.suspended) return pill('cancelled', 'Suspended');
    const b = [];
    if (!r.verified) b.push(pill('pending', 'Email not verified'));
    if (r.must_change) b.push(pill('pending', 'Temporary password'));
    return b.length ? b.join(' ') : pill('open', 'Active');
  };
  PAGES.team = async function (box) {
    let list = await rpc('list_admins');
    const isOwner = owner(), mine = ME.email;
    box.innerHTML = '<p class="hint">' + (isOwner ? 'Everyone here signs in with their own email and password. A new person gets a temporary password from you and must choose their own at first sign-in.' : 'These people can sign in to this dashboard. Only an owner can change the team.') + '</p>' +
      (isOwner ? '<div class="tools"><span class="grow"></span><button class="btn" id="madd" type="button">+ Add a team member</button></div>' : '') + '<div id="mt"></div>';
    const reload = async () => { try { list = await rpc('list_admins'); } catch (e) { toast(e.message, 'err'); } draw(); };
    function draw() {
      $('#mt', box).innerHTML = tableOf(['Person', 'Role', 'Status', '2-step', 'Last sign-in', ''], list.map((r) =>
        '<tr data-e="' + esc(r.email) + '"><td><b>' + esc(r.email) + '</b>' + (r.email === mine ? ' <small style="color:var(--muted)">(you)</small>' : '') + '<br><small style="color:var(--muted)">Added ' + esc(fmtDate(r.created_at)) + (r.created_by ? ' by ' + esc(r.created_by) : '') + '</small></td>' +
        '<td>' + pill(r.role === 'owner' ? 'paid' : 'contacted', r.role === 'owner' ? 'Owner' : 'Team member') + '</td><td>' + badges(r) + '</td><td>' + (r.mfa ? pill('ok', 'On') : pill('off', 'Off')) + '</td>' +
        '<td>' + (r.last_sign_in_at ? esc(fmtDate(r.last_sign_in_at)) : '<span style="color:var(--muted)">Never</span>') + '</td>' +
        '<td><div class="acts">' + (isOwner && r.email !== mine ? '<button class="btn ghost sm" data-m type="button">Manage</button>' : '') + '</div></td></tr>').join(''));
      $$('#mt tbody tr', box).forEach((tr) => { const b = $('[data-m]', tr); if (b) b.onclick = () => manage(list.find((x) => x.email === tr.dataset.e)); });
    }
    function addDialog() {
      const body = '<p style="margin-top:0">We email them a link to confirm their address. You also give them a temporary password; they must choose their own the first time they sign in.</p>' +
        fld('m_email', 'Email address', '', { type: 'email', attr: 'autocomplete="off" maxlength="254"' }) +
        '<div class="f"><label for="m_pw">Temporary password</label><div class="pw"><input class="in" id="m_pw" type="text" autocomplete="off" spellcheck="false" value="' + esc(strongPw()) + '"><button type="button" id="m_gen">New</button></div><small>Made for you. You can type your own: 12 or more characters, three kinds.</small><p class="err" role="alert"></p></div>' +
        '<label class="sw"><input type="checkbox" id="m_ver"> <span>Skip the email link and mark the address as verified now</span></label>';
      const d = openDialog('Add a team member', body, '<button class="btn ghost" id="mcancel" type="button">Cancel</button><button class="btn" id="msave" type="button">Add member</button>');
      $('#m_gen', d).onclick = () => { $('#m_pw', d).value = strongPw(); };
      $('#mcancel', d).onclick = closeDialog;
      $('#msave', d).onclick = async (e) => {
        const email = $('#m_email', d).value.trim().toLowerCase(), pw = $('#m_pw', d).value; let bad = false;
        setErr($('#m_email', d), ''); setErr($('#m_pw', d), '');
        if (!emailOk(email)) { setErr($('#m_email', d), 'Enter a valid email address.'); bad = true; }
        const prob = pwProblem(pw, email); if (prob) { setErr($('#m_pw', d), prob); bad = true; }
        if (bad) return;
        busy(e.target, true, 'Adding…');
        try {
          await rpc('create_member', { p_email: email, p_password: pw });
          let note;
          if ($('#m_ver', d).checked) { await rpc('confirm_member', { p_email: email }); note = 'Their email is marked as verified, so they can sign in now.'; }
          else {
            const j = await fn('verify', { email, redirectTo: here() });
            note = j && j.ok ? 'A confirmation email is on its way to them.' : 'The confirmation email could not be sent (' + ((j && j.error) || 'unknown reason') + '). Open Manage next to their name and choose "Mark verified" so they can sign in with the password below.';
          }
          closeDialog();
          showSecret('Share these with the new member', 'Send these details to <b>' + esc(email) + '</b> in a private message. ' + esc(note), [['Dashboard', here()], ['Email', email], ['Temporary password', pw]], reload);
        } catch (x) { busy(e.target, false); toast(x.message, 'err'); }
      };
    }
    function manage(r) {
      if (!r) return;
      const row = (t, desc, btn) => '<div class="arow"><div><b>' + t + '</b><small>' + desc + '</small></div>' + btn + '</div>';
      const b = (id, text, cls) => '<button class="btn ' + (cls || 'ghost') + ' sm" id="' + id + '" type="button">' + text + '</button>';
      let a = row('Email a link', 'Sends a confirmation link (new people) or a password reset link (everyone else).', b('a_mail', 'Send email'));
      if (r.joined && !r.verified) a += row('Mark email as verified', 'Use when the email link cannot be used. They can then sign in with the temporary password.', b('a_ver', 'Mark verified'));
      if (r.joined) a += row('Set a new temporary password', 'Ends their open sessions. They must choose their own password at the next sign-in.', b('a_pw', 'Set password'));
      if (r.joined) a += row(r.suspended ? 'Restore access' : 'Suspend access', r.suspended ? 'Lets them sign in again.' : 'Blocks sign-in and ends their open sessions. Nothing is deleted.', b('a_sus', r.suspended ? 'Restore' : 'Suspend', r.suspended ? 'ghost' : 'ghost danger-t'));
      if (r.mfa) a += row('Reset 2-step verification', 'Use when they lost their phone. They set it up again at the next sign-in.', b('a_mfa', 'Reset 2-step', 'ghost danger-t'));
      a += '<div class="arow"><div><b>Role</b><small>Owners can add and remove people and change settings.</small></div><div class="acts"><select class="in" id="a_role" style="width:auto" aria-label="Role"><option value="admin"' + (r.role !== 'owner' ? ' selected' : '') + '>Team member</option><option value="owner"' + (r.role === 'owner' ? ' selected' : '') + '>Owner</option></select>' + b('a_rsave', 'Save') + '</div></div>';
      a += row('Remove from team', 'Deletes their login and password for good.', b('a_rm', 'Remove', 'ghost danger-t'));
      const d = openDialog('Manage ' + r.email, '<p style="margin-top:0">' + badges(r) + '</p>' + a, '<button class="btn ghost" id="a_close" type="button">Close</button>');
      $('#a_close', d).onclick = closeDialog;
      const run = (id, work, ok) => {
        const el = $('#' + id, d); if (!el) return;
        el.onclick = async () => { busy(el, true, '…'); try { const done = await work(); if (done === false) { busy(el, false); return; } if (ok) toast(ok, 'ok'); closeDialog(); await reload(); } catch (x) { busy(el, false); toast(x.message, 'err'); } };
      };
      run('a_mail', async () => { const j = await fn('verify', { email: r.email, redirectTo: here() }); if (!j || !j.ok) throw new Error((j && j.error) || 'The email could not be sent.'); }, 'Email sent to ' + r.email);
      run('a_ver', () => rpc('confirm_member', { p_email: r.email }), 'Email marked as verified');
      run('a_sus', async () => {
        if (!r.suspended && !(await confirmBox('Suspend ' + r.email + '?', 'They are signed out at once and cannot sign in until you restore access.', { danger: true, ok: 'Suspend' }))) return false;
        await rpc('set_member_active', { p_email: r.email, p_active: !!r.suspended });
      }, r.suspended ? 'Access restored' : 'Access suspended');
      run('a_mfa', async () => { if (!(await confirmBox('Reset 2-step for ' + r.email + '?', 'They will have to set it up again.', { danger: true, ok: 'Reset' }))) return false; await rpc('reset_member_mfa', { p_email: r.email }); }, '2-step reset');
      run('a_rsave', async () => {
        const role = $('#a_role', d).value; if (role === r.role) return false;
        if (role === 'owner' && !(await confirmBox('Make ' + r.email + ' an owner?', 'Owners can add and remove people and change every setting.', { ok: 'Make owner' }))) return false;
        await rpc('set_admin_role', { p_email: r.email, p_role: role });
      }, 'Role saved');
      run('a_rm', async () => { if (!(await confirmBox('Remove ' + r.email + '?', 'Their login and password are deleted for good.', { danger: true, ok: 'Remove person', typed: r.email }))) return false; await rpc('remove_admin', { p_email: r.email }); }, 'Removed from the team');
      const pwb = $('#a_pw', d);
      if (pwb) pwb.onclick = () => {
        const d2 = openDialog('New temporary password', '<p style="margin-top:0">For <b>' + esc(r.email) + '</b>.</p><div class="f"><label for="n_pw">Temporary password</label><div class="pw"><input class="in" id="n_pw" type="text" autocomplete="off" spellcheck="false" value="' + esc(strongPw()) + '"><button type="button" id="n_gen">New</button></div><p class="err" role="alert"></p></div>', '<button class="btn ghost" id="n_c" type="button">Cancel</button><button class="btn" id="n_s" type="button">Set password</button>');
        $('#n_gen', d2).onclick = () => { $('#n_pw', d2).value = strongPw(); };
        $('#n_c', d2).onclick = closeDialog;
        $('#n_s', d2).onclick = async (e) => {
          const pw = $('#n_pw', d2).value, prob = pwProblem(pw, r.email); setErr($('#n_pw', d2), prob || ''); if (prob) return;
          busy(e.target, true, 'Saving…');
          try { await rpc('set_member_password', { p_email: r.email, p_password: pw }); closeDialog(); showSecret('Share the new password', 'Send this to <b>' + esc(r.email) + '</b> privately. They must change it at the next sign-in.', [['Dashboard', here()], ['Email', r.email], ['Temporary password', pw]], reload); }
          catch (x) { busy(e.target, false); toast(x.message, 'err'); }
        };
      };
    }
    const add = $('#madd', box); if (add) add.onclick = addDialog;
    draw();
  };

  /* ---------- settings ---------- */
  const URL_OK = /^(https:\/\/[a-z0-9.-]+(:\d+)?(\/[^\s?#]*)?|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/[^\s?#]*)?)$/i;
  PAGES.settings = async function (box) {
    const isOwner = owner(), dis = isOwner ? '' : ' disabled';
    const [aR, wR, places] = await Promise.all([rest('admin_settings?id=eq.1&select=*'), rest('settings?id=eq.1&select=*'), rest('destinations?select=id,name&order=name.asc')]);
    const A = (aR && aR[0]) || { notify_on: true, notify_email: '', dashboard_urls: [], require_mfa: false }, W = (wR && wR[0]) || {};
    const feat = W.featured || [];
    box.innerHTML = '<div class="stack" style="max-width:820px">' +
      '<div class="card"><h2>Booking alerts</h2><p class="hint">Every trip request from the website is emailed to this address (sent through Brevo) and is also saved under Booking requests.</p><div id="mailst"></div>' +
      '<label class="sw" style="margin:8px 0 14px"><input type="checkbox" id="a_on"' + (A.notify_on ? ' checked' : '') + dis + '> <span>Email every new request</span></label>' +
      fld('a_mail', 'Send alerts to', A.notify_email || '', { type: 'email', attr: 'maxlength="254"' + dis }) +
      (isOwner ? '<div class="acts" style="justify-content:flex-start"><button class="btn" id="a_save" type="button">Save</button><button class="btn ghost" id="a_test" type="button">Send a test alert</button></div>' : '<p class="hint">Only an owner can change this.</p>') + '</div>' +
      '<div class="card"><h2>Dashboard addresses</h2><p class="hint">Password and confirmation emails link back to this dashboard. Only addresses listed here are ever used, so a link can never point somewhere else. List the address you open this dashboard at (up to 5, one per line).</p>' +
      fld('d_urls', 'Addresses', (A.dashboard_urls || []).join('\n'), { area: true, rows: 3, ph: 'https://your-dashboard.example.com/', attr: dis.trim() }) +
      (isOwner ? '<div class="acts" style="justify-content:flex-start"><button class="btn" id="d_save" type="button">Save addresses</button><button class="btn ghost" id="d_here" type="button">Add this page\'s address</button></div>' : '') + '</div>' +
      '<div class="card"><h2>2-step verification</h2><p class="hint">Everyone can add an authenticator app under My account. Owners can make it compulsory for the whole team (turn it on for your own account first).</p>' +
      '<label class="sw"><input type="checkbox" id="m_req"' + (A.require_mfa ? ' checked' : '') + dis + '> <span>Require 2-step verification for everyone</span></label></div>' +
      '<div class="card"><h2>Website</h2><p class="hint">Shown on the public website straight away.</p>' +
      '<label class="sw" style="margin:6px 0 14px"><input type="checkbox" id="w_on"' + (W.announcement_on ? ' checked' : '') + '> <span>Show the announcement pop-up on the website</span></label>' +
      fld('w_title', 'Headline', W.announcement_title || '', { ph: 'e.g. New: Ghana @ 70 group trip', attr: 'maxlength="80"' }) + fld('w_text', 'Message', W.announcement_text || '', { area: true, rows: 3, attr: 'maxlength="400"' }) + fld('w_link', 'Button link (optional)', W.announcement_link || '', { ph: '#book to open the booking form, or https://…', attr: 'maxlength="500"' }) +
      '<div class="row2">' + fld('w_mail', 'Contact email on the website', W.contact_email || '', { type: 'email', attr: 'maxlength="254"' }) + fld('w_wa', 'WhatsApp number', W.whatsapp || '', { ph: '+233…', attr: 'maxlength="30"' }) + '</div>' +
      '<div class="f"><span class="lbl">Featured places (up to 12)</span><div class="chips" id="w_feat">' + places.map((p) => '<label><input type="checkbox" value="' + esc(p.id) + '"' + (feat.indexOf(p.id) >= 0 ? ' checked' : '') + '> ' + esc(p.name) + '</label>').join('') + '</div><small id="w_cnt"></small></div>' +
      '<button class="btn" id="w_save" type="button">Save website settings</button></div></div>';
    const save = async (btn, path, json, msg) => { busy(btn, true, 'Saving…'); try { await updRows(path, json); toast(msg, 'ok'); return true; } catch (x) { toast(x.message, 'err'); return false; } finally { busy(btn, false); } };
    fn('status').then((s) => {
      const h = $('#mailst', box); if (!h || !s || !s.ok) return;
      h.innerHTML = s.configured ? '<div class="okbox" style="margin-bottom:12px">Email service is connected.</div>' : '<div class="warnbox" style="margin-bottom:12px"><b>Email is not set up yet.</b> In Supabase open Edge Functions, then Secrets, and add <code>BREVO_API_KEY</code>. Until then alerts wait and are sent automatically once it is added.</div>';
    }).catch(() => {});
    if (isOwner) {
      $('#a_save', box).onclick = (e) => { const el = $('#a_mail', box), v = el.value.trim().toLowerCase(); setErr(el, ''); if (!emailOk(v)) return setErr(el, 'Enter a valid email address.'); save(e.target, 'admin_settings?id=eq.1', { notify_on: $('#a_on', box).checked, notify_email: v }, 'Alert settings saved'); };
      $('#a_test', box).onclick = async (e) => { busy(e.target, true, 'Sending…'); try { const j = await fn('test'); if (!j || !j.ok) throw new Error((j && j.error) || 'Could not send.'); toast('Test alert sent', 'ok'); } catch (x) { toast(x.message, 'err'); } busy(e.target, false); };
      $('#d_save', box).onclick = (e) => {
        const el = $('#d_urls', box), ls = lines(el.value).map((x) => x.trim()); setErr(el, '');
        if (ls.length > 5) return setErr(el, 'At most 5 addresses.');
        const badOne = ls.find((x) => !URL_OK.test(x)); if (badOne) return setErr(el, 'Not a valid address: ' + badOne + ' (use https://…).');
        save(e.target, 'admin_settings?id=eq.1', { dashboard_urls: ls }, 'Addresses saved');
      };
      $('#d_here', box).onclick = () => { const h = here(); if (!/^https?:/.test(h)) return toast('Open the dashboard from its web address first.', 'err'); const el = $('#d_urls', box), ls = lines(el.value); if (ls.indexOf(h) < 0) { ls.push(h); el.value = ls.join('\n'); } };
      $('#m_req', box).onchange = async (e) => {
        const on = e.target.checked;
        if (on && claims().aal !== 'aal2') { e.target.checked = false; return toast('Turn on 2-step verification for your own account first (My account).', 'err'); }
        try { await rpc('set_require_mfa', { p_on: on }); ME.require_mfa = on; toast(on ? '2-step is now required for everyone' : '2-step is no longer compulsory', 'ok'); } catch (x) { e.target.checked = !on; toast(x.message, 'err'); }
      };
    }
    const cnt = () => { const n = $$('#w_feat input:checked', box).length; $('#w_cnt', box).textContent = n + ' of 12 chosen'; };
    $$('#w_feat input', box).forEach((i) => { i.onchange = () => { if ($$('#w_feat input:checked', box).length > 12) { i.checked = false; toast('You can feature up to 12 places.', 'err'); } cnt(); }; }); cnt();
    $('#w_save', box).onclick = (e) => {
      const g = (id) => $('#' + id, box); $$('.in', box).forEach((el) => { if (/^w_/.test(el.id)) setErr(el, ''); });
      const link = g('w_link').value.trim(), mail = g('w_mail').value.trim();
      if (link && !/^(https?:\/\/|#|mailto:)/i.test(link)) return setErr(g('w_link'), 'Use #book (or another # section), https://… or mailto:');
      if (mail && !emailOk(mail)) return setErr(g('w_mail'), 'Enter a valid email address.');
      const chosen = $$('#w_feat input:checked', box).map((i) => i.value), ordered = feat.filter((x) => chosen.indexOf(x) >= 0).concat(chosen.filter((x) => feat.indexOf(x) < 0));
      save(e.target, 'settings?id=eq.1', { announcement_on: g('w_on').checked, announcement_title: g('w_title').value.trim(), announcement_text: g('w_text').value.trim(), announcement_link: link, contact_email: mail, whatsapp: g('w_wa').value.trim(), featured: ordered }, 'Website settings saved');
    };
  };

  /* ---------- activity ---------- */
  PAGES.activity = async function (box) {
    const rows = await rest('activity_log?select=id,at,actor,action,detail&order=at.desc&limit=200');
    const kinds = Array.from(new Set(rows.map((r) => r.action))).sort();
    box.innerHTML = '<p class="hint">The last 200 actions: who changed what, and sign-ins.</p><div class="tools"><input class="in grow" id="aq" type="search" placeholder="Search" aria-label="Search activity"><select class="in" id="ak" aria-label="Type"><option value="">All types</option>' + kinds.map((k) => '<option>' + esc(k) + '</option>').join('') + '</select></div><div id="at"></div>';
    let q = '', k = '';
    const draw = () => {
      const t = q.toLowerCase(), l = rows.filter((r) => (!k || r.action === k) && (!t || (r.actor + ' ' + r.action + ' ' + r.detail).toLowerCase().indexOf(t) >= 0));
      $('#at', box).innerHTML = l.length ? tableOf(['When', 'Who', 'Type', 'Detail'], l.map((r) => '<tr><td>' + esc(fmtDate(r.at)) + '</td><td>' + esc(r.actor || '—') + '</td><td>' + pill('', r.action) + '</td><td>' + esc(r.detail || '') + '</td></tr>').join('')) : '<div class="card empty">Nothing yet.</div>';
    };
    $('#aq', box).oninput = (e) => { q = e.target.value; draw(); };
    $('#ak', box).onchange = (e) => { k = e.target.value; draw(); };
    draw();
  };

  /* ---------- my account ---------- */
  PAGES.account = async function (box) {
    box.innerHTML = '<div class="stack" style="max-width:720px">' +
      '<div class="card"><h2>Your account</h2><dl class="dl"><dt>Email</dt><dd>' + esc(ME.email) + '</dd><dt>Role</dt><dd>' + (owner() ? 'Owner' : 'Team member') + '</dd></dl></div>' +
      '<div class="card"><h2>Change password</h2><form id="cpf" novalidate>' + newPwFields('c1', 'c2') + '<button class="btn" id="cpgo" type="submit">Change password</button></form><p class="hint" style="margin-top:12px">Use 12 or more characters. Your other devices are signed out.</p></div>' +
      '<div class="card"><h2>2-step verification</h2><div id="mfabox"><p class="hint">Loading…</p></div></div>' +
      '<div class="card"><h2>Sign out</h2><p class="hint">Ends every open session of yours on every device, including this one.</p><button class="btn ghost" id="soall" type="button">Sign out everywhere</button></div></div>';
    bindShow(box); bindMeter(box, 'c1');
    $('#cpf', box).onsubmit = async (e) => {
      e.preventDefault();
      const a = $('#c1', box), b = $('#c2', box); setErr(a, ''); setErr(b, '');
      const prob = pwProblem(a.value, ME.email); if (prob) return setErr(a, prob);
      if (a.value !== b.value) return setErr(b, 'The two passwords do not match.');
      const btn = $('#cpgo', box); busy(btn, true, 'Saving…');
      try { await auth.setPassword(a.value); await rpc('password_changed').catch(() => {}); a.value = ''; b.value = ''; toast('Password changed', 'ok'); } catch (x) { setErr(a, x.message); }
      busy(btn, false);
    };
    const mbox = $('#mfabox', box);
    const renderMfa = async () => {
      let on = false; try { const f = await auth.factors(); on = !!(f && f.verified && f.verified.length); } catch (x) { mbox.innerHTML = '<p class="err" style="display:block">' + esc(x.message) + '</p>'; return; }
      if (on) {
        mbox.innerHTML = '<p>' + pill('ok', 'On') + ' Sign-in asks for a 6-digit code from your authenticator app.</p>' + (ME.require_mfa ? '<p class="hint">The owner requires 2-step for everyone, so it cannot be turned off.</p>' : '<button class="btn ghost danger-t" id="mfaoff" type="button">Turn off</button>');
        const off = $('#mfaoff', mbox);
        if (off) off.onclick = async () => {
          if (!(await confirmBox('Turn off 2-step?', 'Your account will be protected by your password alone.', { danger: true, ok: 'Turn off' }))) { renderMfa(); return; }
          try { const ff = await auth.factors(); for (const x of ff.verified) await auth.unenroll(x.id); rpc('log_security', { p_event: 'mfa_off' }).catch(() => {}); toast('2-step turned off', 'ok'); } catch (x) { toast(x.message, 'err'); }
          renderMfa();
        };
      } else {
        mbox.innerHTML = '<p>' + pill('off', 'Off') + ' Add a second step with an authenticator app (Google Authenticator, Authy, 1Password…).</p><button class="btn" id="mfaon" type="button">Turn on 2-step verification</button><div id="enr" style="margin-top:16px"></div>';
        $('#mfaon', mbox).onclick = (e) => { e.target.hidden = true; enrollUI($('#enr', mbox), () => { toast('2-step is on', 'ok'); rpc('log_security', { p_event: 'mfa_on' }).catch(() => {}); renderMfa(); }); };
      }
    };
    renderMfa();
    $('#soall', box).onclick = async () => { if (await confirmBox('Sign out everywhere?', 'Every session of yours ends, on every device.', { ok: 'Sign out everywhere' })) leave('manual', 'global'); };
  };

  /* ---------- start ---------- */
  async function boot() {
    if (FRAMED) { $('#app').innerHTML = '<div class="boot"><p>For your security this dashboard opens only in its own browser tab.<br><a href="' + esc(location.href) + '" target="_blank" rel="noopener noreferrer">Open it in a new tab</a></p></div>'; return; }
    const h = readHash();
    if (h) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* ignore */ }
      if (h.error || h.error_description) return viewLogin('That link did not work. Request a new one with "Forgot password".');
      if (h.token_hash && ['recovery', 'magiclink', 'signup', 'invite', 'email'].indexOf(h.type) >= 0) {
        viewLoading();
        try { await auth.verifyLink(h.type, h.token_hash); } catch (e) { return viewLogin('That link has expired or was already used. Request a new one with "Forgot password".'); }
        if (h.type === 'recovery') FORCE_PW = 'recovery';
        SIGNED_IN = true; return proceed();
      }
      return viewLogin('That link is not valid. Request a new one with "Forgot password".');
    }
    if (S) return proceed();
    viewLogin();
  }
  boot();
})();
