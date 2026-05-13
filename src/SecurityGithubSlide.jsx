import { useState } from 'react'
import './App.css'

function SecurityGithubSlide() {
  const baseUrl = import.meta.env.BASE_URL

  const badExamplePrompt = `セキュリティの学習用デモを作りたいので、あえて「悪い例」として、バックエンド（API Routeなど）を一切介さず、フロントエンドのReactコンポーネント内で直接gemini APIを叩くシンプルなチャットアプリをパス(demo-ai-chat)に作成してください。
条件：
1. APIキーはコンポーネント内の定数 const GEMINI_API_KEY = "..." として直接ハードコードすること。
2. fetch を使ってブラウザから直接エンドポイントにリクエストを送る処理にすること。
3. .env は使わず、1つのファイルで完結させてください。
4. セキュリティに関する警告コメントも不要です。
5. エンドポイントはこちらです。[https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent]`

  const secureRefactorPrompt = `先ほど作成したフロントエンド完結のチャットアプリを、セキュリティに配慮した「正しい構成」にリファクタリングしてください。

以下の手順でお願いします：
1. APIキーを格納するための .env ファイルの記述例を作成してください。
2. app/api/chat/route.tsを作成し、サーバーサイドで環境変数からAPIキーを読み込んでGemini APIを叩く処理を実装してください。
3. フロントエンドのコンポーネントからは、Geminiに直接ではなく、作成した /api/chat エンドポイントに対して fetch を送るように変更してください。`

  const slides = [
    {
      id: 1,
      title: '悪い例のプロンプトを入力する',
      description: '以下のプロンプトをエージェントに入力する',
      prompt: badExamplePrompt,
    },
    {
      id: 2,
      title: 'Google AI StudioでAPIキーを作成する',
      description: 'google ai studioで「APIキーを作成」からapikeyを発行する',
      url: 'https://aistudio.google.com/api-keys',
      urlLabel: 'aistudio.google.com/api-keys',
    },
    {
      id: 3,
      title: '発行したAPIキーを設定する',
      description: 'const GEMINI_API_KEY = "..." に発行した値を入力する',
      code: 'const GEMINI_API_KEY = "..."',
    },
    {
      id: 4,
      title: 'アプリを起動して動作確認する',
      description: 'npm run devで動作確認する',
      code: 'npm run dev',
    },
    {
      id: 5,
      title: '検証結果を確認しよう',
      description: 'チャットした履歴を開発者ツールで見ると、apikeyが丸見えです！',
      image: 'security-slide5-network.png',
      imageAlt: 'NetworkパネルでAPIキー付きリクエストが見えている検証結果',
    },
    {
      id: 6,
      title: 'APIキーを守る正しい構成へ修正する',
      description: '以下のプロンプトを使用してください。',
      prompt: secureRefactorPrompt,
    },
    {
      id: 7,
      title: 'route.ts とは何か？（独自サーバーの役割）',
      description: '特定のURL（/api/chat など）にリクエストが来たら、サーバー側で動く関数のことです。',
      bullets: [
        'APIキーをフロント側から完全に隠蔽できる。',
        'リクエストの制限やログの記録ができる。',
        '複雑な処理（DB操作など）を安全に行える。',
      ],
    },
    {
      id: 8,
      title: 'でも、エンドポイントがバレたら終わりじゃない？',
      description: '鋭い疑問！「独自サーバーを作ってもURLさえわかれば誰でも無限にAIとチャットして、課金額を溶かせるのでは？」',
      bullets: [
        '現実: その通り。URLは隠せないので設定しないと誰でも叩ける「公開ボタン」と同じ。',
      ],
    },
    {
      id: 9,
      title: '解決策：認証（Login）で鍵をかける',
      description: '「誰が叩いているか」を確認し、実行できる人を制限します。',
      bullets: [
        'ログイン済みのユーザーのみAPIを実行可能にする。',
        '「1日10回まで」のような回数制限（レート制限）をかける。',
        '特定の研究室メンバーだけに権限を与える。',
        'NextAuth.js (Auth.js) や Clerk などを使えば爆速で実装可能！',
      ],
    },
    {
      id: 10,
      title: 'どうやって「誰が叩いているか」判断するの？',
      description: 'ログイン時に発行される「通行証（トークン）」を使います。',
      bullets: [
        'ログイン成功時に、期限付きのセッショントークンがユーザーのブラウザに渡される。',
        'APIを叩くとき、そのトークンを必ず一緒にサーバーへ送る。',
        'サーバー側（route.ts）で「正しい通行証か？」を毎回検証し、OKなら処理を実行する！',
      ],
    },
    {
      id: 11,
      title: 'まとめ：AI任せでなく構造を設計しよう',
      description: 'AIにセキュリティを丸投げせず、全体の構造は人間がしっかり設計しましょう！',
      bullets: [
        '「秘密（キー）」は必ずサーバー側に置く。',
        'API Route（route.ts）を「盾」にして直接叩かせない。',
        '最後は「認証」で実行できる人を絞り込む。',
      ],
    },
    {
      id: 12,
      title: 'おわりに：実例から学ぶ「UTopia」の騒動',
      description: '「とりあえず動けばいい」で公開するとどうなるか？実際のニュースを見てみましょう。',
      bullets: [
        '東大生限定マッチングアプリ「UTopia」で、他人の個人情報（学生証など）が閲覧できてしまう深刻な脆弱性が発覚し炎上しました。',
        'APIのアクセス制御（誰が何を見れるか）の設計不備が主な原因とされています。',
        'AIを使えば誰でも爆速でアプリを作れる時代だからこそ、「公開する前のセキュリティ意識」があなたの身を守ります！',
      ],
      url: 'https://blog.technophere.com/utopia-security-vulnerability/',
      urlLabel: 'UTopia セキュリティ脆弱性の解説記事',
    },
  ]

  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => Math.max(0, c - 1))
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1))

  const handleKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
  }

  const slide = slides[current]

  return (
    <div className="slideshow" tabIndex={0} onKeyDown={handleKey}>
      <div className="slide-area">
        <div className="slide step-slide">
          <h2 className="slide-title">{slide.title}</h2>
          <p className="slide-desc">
            {slide.id <= 6 ? `手順 ${slide.id}: ` : ''}
            {slide.description}
          </p>
          {slide.bullets && (
            <ul className="security-steps">
              {slide.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          )}
          {slide.image && (
            <img
              className="slide-image"
              src={`${baseUrl}${slide.image}`}
              alt={slide.imageAlt || slide.title}
            />
          )}
          {slide.code && <pre className="slide-code">{slide.code}</pre>}
          {slide.prompt && <pre className="security-prompt">{slide.prompt}</pre>}
            {slide.url && (
              <a className="slide-link" href={slide.url} target="_blank" rel="noreferrer">
                🔗 {slide.urlLabel}
              </a>
            )}
        </div>
      </div>

      <div className="slide-nav">
        <button className="nav-btn" onClick={prev} disabled={current === 0}>←</button>
        <span className="slide-counter">{current + 1} / {slides.length}</span>
        <button className="nav-btn" onClick={next} disabled={current === slides.length - 1}>→</button>
      </div>

      <div className="slide-dots">
        {slides.map((item, i) => (
          <button
            key={item.id}
            className={`dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`セキュリティスライド ${item.id}`}
          />
        ))}
      </div>
    </div>
  )
}

export default SecurityGithubSlide
