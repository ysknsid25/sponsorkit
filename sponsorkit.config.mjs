import { defineConfig, tierPresets } from 'sponsorkit'

// monthlyDollars: 0 の単一ティアにまとめることで
// Past Sponsors / Sponsors を区別せず同列表示する
const mergedTier = preset => [{ monthlyDollars: 0, preset }]

export default defineConfig({
  // GitHub Pages にそのまま publish するディレクトリ
  outputDir: 'public',
  // これを true にしないと、GitHubへの問い合わせ自体がアクティブな
  // スポンサーのみに絞られ、過去スポンサーが取得されない
  includePastSponsors: true,
  renderer: 'tiers',
  formats: ['svg', 'png'],
  github: {
    login: 'ysknsid25',
    type: 'user',
  },
  renders: [
    {
      // ブログ記事末尾に埋め込む用。はてなブログの本文カラム幅に合わせた横長版。
      // medium の maxLength は 10 で名前が途中で切れるため 16 に広げ、
      // それが収まるよう boxWidth も少し広げている
      name: 'sponsors',
      width: 800,
      tiers: mergedTier({
        ...tierPresets.medium,
        boxWidth: 92,
        name: { maxLength: 16 },
      }),
    },
    {
      // サイドバー等の狭い領域向け。アバターを大きめにして潰れを防ぐ
      name: 'sponsors-narrow',
      width: 400,
      tiers: mergedTier(tierPresets.large),
    },
  ],
})
