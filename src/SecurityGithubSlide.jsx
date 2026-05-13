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
          <p className="slide-desc">手順 {slide.id}: {slide.description}</p>
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
