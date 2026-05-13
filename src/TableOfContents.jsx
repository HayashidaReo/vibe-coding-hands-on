function TableOfContents() {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <main className="toc-page">
      <section className="toc-card">
        <p className="toc-kicker">Slide Index</p>
        <h1 className="toc-title">目次</h1>
        <p className="toc-subtitle">見たいスライドを選んでください。</p>

        <nav className="toc-links" aria-label="スライド一覧">
          <a className="toc-link" href={`${baseUrl}hands-on`}>
            以前作ったバイブコーディングハンズオン
          </a>
          <a className="toc-link" href={`${baseUrl}security`}>
            APIキーとセキュリティの実践スライド
          </a>
        </nav>
      </section>
    </main>
  )
}

export default TableOfContents
