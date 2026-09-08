# 公開ライブラリ / GitHub Pages

ポケモンのダメージ計算機と旅行計画・ガイドを公開するリポジトリです。

## 公開ページ

- [ホーム](https://tndhk.github.io/skills-github-pages/)
- [公開ページ一覧](https://tndhk.github.io/skills-github-pages/html/)
- [ポケモン ダメージ計算機](https://tndhk.github.io/skills-github-pages/pokemon-damage-calc/)
- 旅行記事: ホームと公開ページ一覧に日付順で表示

## 構成と一覧への登録

| 保存先 | 用途 |
|---|---|
| index.html | トップページ |
| html/index.html | 公開ページ一覧（既存URLを維持） |
| _data/public_pages.yml | 静的ページ・アプリの掲載情報の正本 |
| _includes/public-pages.html | トップと一覧で共用する掲載部分 |
| pokemon-damage-calc/ | 計算機のHTML・CSS・JavaScript |
| _posts/ | 旅行記事。Jekyllが一覧と記事URLを自動生成 |
| html/template.html | 新規HTMLの作成用テンプレート |
| scripts/check_site.py | 生成後の内部リンク・アンカー・トップからの到達性を検査 |

静的ページは html/<category>/<slug>/index.html などに追加し、_data/public_pages.yml にタイトル・カテゴリ・説明・公開URLを登録します。トップと一覧へ同時に反映されます。URLは baseurl を含めず、/pokemon-damage-calc/ のように記述してください。

旅行記事は _posts/YYYY-MM-DD-slug.md に追加すると自動掲載されます。公開済みURLは、リンク切れを避けるため移動・変更しない運用です。削除したページはGit履歴から復元できます。

## ローカル検証

Jekyll 3.10 と Python 3.9 以上を使います。Ruby環境で一度依存関係をインストールしてください。

```sh
gem install jekyll -v 3.10.0 --no-document
gem install jekyll-feed jekyll-seo-tag kramdown-parser-gfm --no-document
jekyll build
python3 scripts/check_site.py _site
jekyll serve --host 127.0.0.1
```

http://127.0.0.1:4000/skills-github-pages/ を開いて確認します。計算機だけなら、リポジトリ直下で Python のHTTPサーバーを起動して表示できます。一覧はLiquidを使うため、Jekyllで生成してから確認してください。

検査では、内部リンク・画像・CSS・JavaScriptの参照先、HTML内のアンカー、トップから全HTMLページへ辿れることを確認します。外部サイトの生存確認や計算結果の正しさは検査対象外です。

## 変更の反映

1. 最新版を取得し、変更用ブランチで編集する。
2. Jekyllビルドとリンク検査を実行し、PC・スマートフォンで導線を確認する。
3. 対象差分をコミットして main に反映する。
4. GitHub Actions の pages build and deployment 成功と公開ページを確認する。

Site navigation checks は push と pull request で自動実行します。ルートの npm スクリプトは旅行記事用の Tailwind CSS を生成するもので、計算機のビルドは不要です。
