# sponsorkit

[GitHub Sponsors](https://github.com/sponsors/ysknsid25) のスポンサー一覧画像を [sponsorkit](https://github.com/antfu-collective/sponsorkit) で生成し、GitHub Pages 経由で配信するためのリポジトリ。

ブログ記事末尾などに `<img>` で貼るだけで、常に最新のスポンサー情報が表示される状態を作ることが目的。

## 生成物

GitHub Actions が毎日 03:00 JST に再生成し、差分があれば `public/` にコミットして GitHub Pages にデプロイする。

| ファイル | サイズ | 用途 |
| --- | --- | --- |
| `sponsors.svg` / `.png` | 800 × 160 | ブログ本文カラム向けの横長版 |
| `sponsors-narrow.svg` / `.png` | 400 × 185 | サイドバー等の狭い領域向け |

どちらもアバターの下にスポンサー名が入る。※ 高さはスポンサー数に応じて変わる。

## 配信URL

```
https://ysknsid25.github.io/sponsorkit/sponsors.svg
https://ysknsid25.github.io/sponsorkit/sponsors.png
https://ysknsid25.github.io/sponsorkit/sponsors-narrow.svg
https://ysknsid25.github.io/sponsorkit/sponsors-narrow.png
```

SVG を推奨。`raw.githubusercontent.com` は SVG を `Content-Type: text/plain` + `X-Content-Type-Options: nosniff` で返すため `<img>` で描画されない。GitHub Pages なら正しい MIME で返り、かつ CDN 配信される。

## ブログへの埋め込み

`hatena-blog-theme-git` の `html/sponsor.html` にあるスポンサーCTAの下に、次を差し込む想定。

```html
<a href="https://github.com/sponsors/ysknsid25" class="tip-sponsors-link">
    <img
        src="https://ysknsid25.github.io/sponsorkit/sponsors.svg"
        alt="Sponsors"
        width="800"
        height="160"
        loading="lazy"
        style="max-width: 100%; height: auto"
    />
</a>
```

`width` / `height` はレイアウトシフト防止のための目安。スポンサー数が増えて高さが変わっても `height: auto` で追従する。

## セットアップ

### 1. リポジトリ設定

- **Settings → Pages → Source** を `GitHub Actions` にする
- **Settings → Secrets and variables → Actions** に `SPONSORKIT_GITHUB_TOKEN` を登録する
  - `read:user` と `read:org` スコープを持つ Personal Access Token
  - デフォルトの `GITHUB_TOKEN` ではスポンサー情報を取得できない
- (任意) 同画面の Variables に `SPONSORKIT_GITHUB_LOGIN` を登録。未設定なら `ysknsid25` にフォールバックする

### 2. ローカル実行

```console
$ pnpm install
$ cp .env.local.example .env.local   # トークンを記入する
$ pnpm run sponsors:local
```

CI と同じく `public/` に出力される。

## 設定

[`sponsorkit.config.mjs`](./sponsorkit.config.mjs) を参照。

`includePastSponsors: true` かつ全ティアを `monthlyDollars: 0` にまとめることで、現在のスポンサーと過去のスポンサーを区別せず同列に並べている。
