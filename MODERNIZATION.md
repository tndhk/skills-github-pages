# 🚀 Modernization Guide

この文書は、Tailwind CSS を使用したサイトの現代化について説明します。

## 新機能

### 1. **レスポンシブデザイン**
- モバイル優先の設計
- 全デバイスで最適化されたレイアウト
- ハンバーガーメニュー対応

### 2. **Tailwind CSS スタイリング**
- ユーティリティファーストの CSS フレームワーク
- モダンで一貫したデザイン
- 高速で最適化された CSS

### 3. **インタラクティブ機能**
- スムーズなスクロール
- モバイルメニュー自動閉鎖
- アニメーション効果
- 読み込み時のフェードイン
- スクロール時のスライドアップ

### 4. **改善されたナビゲーション**
- スティッキーヘッダー
- モバイル対応メニュー
- フッターナビゲーション

### 5. **拡張されたコンテンツ表示**
- カード型レイアウト
- 関連記事セクション
- アバウトセクション
- 目次の自動生成（ブログ記事）

## プロジェクト構造

```
├── _layouts/
│   ├── default.html      # メインレイアウト
│   ├── home.html         # ホームページレイアウト
│   └── post.html         # ブログ記事レイアウト
├── _includes/
│   ├── header.html       # ヘッダーコンポーネント
│   └── footer.html       # フッターコンポーネント
├── assets/
│   ├── css/
│   │   ├── input.css     # Tailwind入力ファイル
│   │   └── main.css      # コンパイル済みCSS
│   └── js/
│       └── main.js       # JavaScriptコード
├── _posts/               # ブログ記事
├── _config.yml           # Jekyll設定
├── package.json          # npm パッケージ
├── tailwind.config.js    # Tailwind設定
└── index.md              # ホームページ
```

## 開発環境セットアップ

### 必須ツール
- Node.js 16 以上
- npm または yarn
- Jekyll

### インストール手順

```bash
# 1. 依存パッケージをインストール
npm install

# 2. Tailwind CSS をビルド
npm run build:css

# 3. ウォッチモード（開発時）
npm run watch:css

# 4. Jekyll をサーブ（別ターミナル）
jekyll serve
```

## カスタマイズ

### 色のカスタマイズ
`tailwind.config.js` で色を編集:

```javascript
colors: {
  primary: {
    600: '#0284c7',  // メインカラー
    700: '#0369a1',
  }
}
```

### フォントのカスタマイズ
`assets/css/main.css` で フォント ファミリーを編集

### アニメーションのカスタマイズ
`tailwind.config.js` の `keyframes` セクションで アニメーション をカスタマイズ

## GitHub Pages デプロイ

このサイトは GitHub Actions で自動的に Tailwind CSS をビルドします。

### ワークフロー
`.github/workflows/build-css.yml` で以下が実行されます:
1. Node.js 環境をセットアップ
2. 依存パッケージをインストール
3. Tailwind CSS をビルド
4. 変更をコミット＆プッシュ

## ブラウザサポート

- Chrome/Edge: 最新
- Firefox: 最新
- Safari: 最新
- モバイルブラウザ: iOS Safari, Android Chrome

## パフォーマンス最適化

- ✅ レスポンシブ画像
- ✅ 最小化された CSS
- ✅ 遅延ロードされたスクリプト
- ✅ スムーズなアニメーション

## トラブルシューティング

### CSS が反映されない場合
```bash
npm run build:css
```
を実行してから、ブラウザキャッシュをクリアしてください。

### Jekyll が起動しない場合
```bash
gem install bundler
bundle install
jekyll serve
```

### モバイルメニューが機能しない場合
ブラウザの JavaScript が有効になっていることを確認してください。

## 今後の機能予定

- [ ] ダークモード対応
- [ ] 検索機能
- [ ] カテゴリタグ
- [ ] コメント機能
- [ ] ソーシャルシェア
- [ ] 多言語対応

## サポート

質問や問題がある場合は、GitHub Issues で報告してください。

---

**最終更新**: 2025年12月
**バージョン**: 1.0.0
