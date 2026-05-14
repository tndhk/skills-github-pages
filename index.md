---
layout: none
title: HTML Library
---
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>HTML Library</title>
  <style>
    :root {
      --bg: #061018;
      --panel: rgba(15, 23, 42, 0.78);
      --panel-strong: rgba(15, 23, 42, 0.96);
      --text: #e2e8f0;
      --muted: #94a3b8;
      --line: rgba(148, 163, 184, 0.14);
      --accent: #38bdf8;
      --accent2: #e82127;
      --radius: 18px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans JP", sans-serif;
      background:
        radial-gradient(circle at top left, rgba(56,189,248,.18), transparent 28%),
        radial-gradient(circle at 80% 20%, rgba(232,33,39,.14), transparent 24%),
        linear-gradient(180deg, #08111d 0%, #061018 100%);
      color: var(--text);
    }
    .wrap {
      width: min(1080px, calc(100% - 32px));
      margin: 0 auto;
      padding: 48px 0 56px;
    }
    .hero, .card, .note {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      backdrop-filter: blur(10px);
      box-shadow: 0 12px 40px rgba(0,0,0,.18);
    }
    .hero {
      padding: 32px;
      margin-bottom: 24px;
    }
    .eyebrow {
      color: var(--accent);
      letter-spacing: .18em;
      text-transform: uppercase;
      font-size: 12px;
      margin-bottom: 14px;
    }
    h1 {
      margin: 0 0 14px;
      font-size: clamp(32px, 5vw, 56px);
      line-height: 1.05;
    }
    .lead {
      margin: 0;
      color: var(--muted);
      max-width: 760px;
      line-height: 1.7;
      font-size: 16px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }
    .card {
      padding: 20px;
    }
    .card h2 {
      margin: 0 0 8px;
      font-size: 20px;
    }
    .card p {
      margin: 0 0 12px;
      color: var(--muted);
      line-height: 1.6;
    }
    a {
      color: var(--accent);
      text-decoration: none;
    }
    a:hover { text-decoration: underline; }
    .btn {
      display: inline-block;
      margin-top: 10px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(56,189,248,.14);
      border: 1px solid rgba(56,189,248,.26);
      color: #dff7ff;
      font-weight: 600;
    }
    .note {
      margin-top: 24px;
      padding: 18px 20px;
      color: var(--muted);
      line-height: 1.7;
    }
    code {
      background: rgba(148,163,184,.12);
      border: 1px solid rgba(148,163,184,.18);
      padding: 0.12em 0.35em;
      border-radius: 6px;
      color: #fff;
    }
    ul { margin: 12px 0 0 20px; }
    li { margin: 6px 0; }
  </style>
</head>
<body>
  <main class="wrap">
    <section class="hero">
      <div class="eyebrow">GitHub Pages HTML Library</div>
      <h1>HTMLを増やしていくための置き場</h1>
      <p class="lead">
        このリポジトリは、単発のHTMLスライドやメモをどんどん追加していくための公開ライブラリです。
        追加したHTMLはそのままURLで共有でき、iPhoneでもSafariから開けます。
      </p>
      <div class="grid">
        <div class="card">
          <h2>現在の公開ページ</h2>
          <p>Tesla Model 3 の購入検討スライドを置いています。</p>
          <a class="btn" href="html/tesla-model3-analysis/">Teslaスライドを開く</a>
        </div>
        <div class="card">
          <h2>追加のしかた</h2>
          <p>新しいHTMLは <code>html/&lt;category&gt;/&lt;slug&gt;/index.html</code> に追加。</p>
          <p>例: <code>html/finance/monthly-review/index.html</code></p>
        </div>
        <div class="card">
          <h2>おすすめの運用</h2>
          <p>一覧ページから各HTMLへ飛べるようにして、古い版は残したまま増やしていく。</p>
          <a class="btn" href="html/">HTML一覧へ</a>
        </div>
      </div>
    </section>

    <section class="note">
      <strong>このサイトでやること</strong>
      <ul>
        <li>HTMLを増やす</li>
        <li>一覧ページから選べるようにする</li>
        <li>テーマごとにフォルダを分ける</li>
        <li>過去版を archive として残す</li>
      </ul>
    </section>
  </main>
</body>
</html>
