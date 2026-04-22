import { useState } from 'react'
import './App.css'

const slides = [
  {
    id: 0,
    type: 'title',
    title: 'バイブコーディング手順',
  },
  {
    id: 1,
    step: 1,
    title: 'GitHubアカウント作成',
    description: 'Copilot を使うために GitHub アカウントを作成しましょう。',
    url: 'https://github.com/',
    urlLabel: 'github.com',
  },
  {
    id: 2,
    step: 2,
    title: 'VS Code をダウンロード',
    description: '公式サイトから VS Code をダウンロードしてインストールします。',
    url: 'https://code.visualstudio.com/',
    urlLabel: 'code.visualstudio.com',
  },
  {
    id: 3,
    step: 3,
    title: 'Node.js (npm) をダウンロード',
    description: '公式サイトから LTS 版をダウンロードしてインストールします。',
    url: 'https://nodejs.org/',
    urlLabel: 'nodejs.org',
  },
  {
    id: 4,
    step: 4,
    title: '拡張機能をインストール',
    description: 'VS Code に「GitHub Copilot」と「Copilot Chat」の拡張機能を追加します。',
  },
  {
    id: 5,
    step: 5,
    title: 'Vite プロジェクトを作成',
    description: 'チャッピーなどに「vite のプロジェクトの立ち上げ方を教えて」と聞いて、ターミナルで実行します。',
  },
  {
    id: 6,
    step: 6,
    title: 'プロジェクトに移動',
    description: 'cd コマンドで作成した vite プロジェクトのディレクトリに移動します。',
    code: 'cd <プロジェクト名>',
  },
  {
    id: 7,
    step: 7,
    title: 'Copilot に指示を送る',
    description: 'モデルを GPT-4.1 に選択し、「○○を作りたい。（こだわるポイントやコンセプトを伝える）実行して。」と送信します。',
  },
  {
    id: 8,
    step: 8,
    title: '完成物を確認',
    description: 'ローカルサーバーを起動して、ブラウザで完成物を確認しましょう！',
    code: 'npm run dev',
  },
  {
    id: 9,
    step: 10,
    title: 'ブラッシュアップを繰り返す',
    description: 'エラーや改善点を見つけて、再度 Copilot に指示を送る。確認する。を繰り返してクオリティを上げましょう！',
  },
]

function App() {
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
        {slide.type === 'title' ? (
          <div className="slide title-slide">
            <h1 className="slide-main-title">{slide.title}</h1>
            <p className="slide-subtitle">GitHub Copilot ✕ Vite ✕ React</p>
          </div>
        ) : (
          <div className="slide step-slide">
            <div className="step-number">STEP {slide.step}</div>
            <h2 className="slide-title">{slide.title}</h2>
            <p className="slide-desc">{slide.description}</p>
            {slide.code && <pre className="slide-code">{slide.code}</pre>}
            {slide.url && (
              <a className="slide-link" href={slide.url} target="_blank" rel="noreferrer">
                🔗 {slide.urlLabel}
              </a>
            )}
          </div>
        )}
      </div>

      <div className="slide-nav">
        <button className="nav-btn" onClick={prev} disabled={current === 0}>←</button>
        <span className="slide-counter">{current + 1} / {slides.length}</span>
        <button className="nav-btn" onClick={next} disabled={current === slides.length - 1}>→</button>
      </div>

      <div className="slide-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`スライド ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default App
