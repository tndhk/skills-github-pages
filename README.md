# 旅行メモ

家族との旅の思い出と旅行計画のコツをシェアするブログです。

## このサイトについて

このサイトはJekyll + GitHub Pagesで構築された旅行ブログです。家族旅行の記録や旅行計画のヒントなどを投稿しています。

## 技術スタック

- **Jekyll**: 静的サイトジェネレーター
- **GitHub Pages**: ホスティング
- **Tailwind CSS**: スタイリング
- **カスタムレイアウト**: モダンなブログデザイン

## ローカル開発

### 前提条件

- Ruby（2.7以降）
- Bundler
- Node.js（Tailwind CSSのビルド用）

### セットアップ

1. リポジトリをクローン

```bash
git clone <repository-url>
cd skills-github-pages
```

2. 依存関係をインストール

```bash
bundle install
npm install
```

3. ローカルサーバーを起動

```bash
bundle exec jekyll serve
```

サイトは `http://localhost:4000` で確認できます。

### Tailwind CSSのビルド

開発中にスタイルを変更する場合：

```bash
npm run build:css
```

## ブログ記事の追加

新しい記事は `_posts` ディレクトリに追加します。ファイル名は `YYYY-MM-DD-title.md` の形式にしてください。

例：
```markdown
---
layout: post
title: "記事のタイトル"
date: 2025-05-07
categories: [旅行]
---

記事の内容をここに書きます。
```

## デプロイ

このサイトはGitHub Pagesで自動的にデプロイされます。`main`ブランチにプッシュすると自動的にビルド・公開されます。

## ライセンス

[MIT License](LICENSE)
