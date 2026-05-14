# HTML Library / GitHub Pages

このリポジトリは、HTMLスライドや静的ページを増やしていくための GitHub Pages 置き場です。

## 目的

- 1つのHTMLを差し替えるのではなく、HTMLをどんどん追加する
- iPhoneでもそのまま開ける共有URLを持つ
- テーマごとに過去版を残しつつ蓄積する

## 公開ページ

- ホーム: `/skills-github-pages/`
- 一覧ページ: `/skills-github-pages/html/`
- Teslaスライド: `/skills-github-pages/html/tesla-model3-analysis/`

## 追加ルール

新しいHTMLは、基本的にこの形で追加します。

```text
html/<category>/<slug>/index.html
```

例:

```text
html/tesla/model3-analysis/index.html
html/finance/monthly-review/index.html
html/books/summary-2026-05/index.html
```

## ふるまい

- `index.html` は各ページのトップに置く
- 一覧ページから各HTMLにリンクする
- 古い版は消さずに残す
- 1つのテーマに複数ページを持たせてもよい

## 更新方法

1. HTMLファイルを追加する
2. 一覧ページにリンクを足す
3. `main` に push する
4. GitHub Pages が自動反映する

## 補足

- 既存の Jekyll 設定はそのまま使っています
- 静的 HTML は front matter なしでもそのまま配信されます
- テンプレートは `html/template.html` を参照してください
