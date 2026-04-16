# Vibe Coding ハンズオン — 環境構築

このリポジトリは「バイブコーディング」ハンズオン用の React + Vite テンプレートです。ここではワークショップ参加者向けに環境構築手順をまとめています。

## 前提
- Node.js v18 以上（推奨）
- Git
- Visual Studio Code（推奨）

## 手順

1. リポジトリをクローン

```bash
git clone https://github.com/HayashidaReo/vibe-coding-hands-on.git
cd vibe-coding-hands-on
```

2. Node の確認／インストール（macOS 例）

```bash
node -v
# 推奨: Node.js 18 以上
# nvm を使う場合
nvm install --lts
nvm use --lts
```

3. 依存関係をインストール

```bash
npm install
```

4. 開発サーバを起動

```bash
npm run dev
# ブラウザで http://localhost:5173 を開く
```

5. ビルド／プレビュー

```bash
npm run build
npm run preview
```

6. Lint（ESLint）

```bash
npm run lint
```

## VSCode の推奨拡張
このプロジェクトには推奨拡張一覧を用意しています。VSCode でワークスペースを開くと「推奨拡張を表示」などのプロンプトが出ます。手動でインストールする場合は `code` コマンドを利用できます（`Shell Command: Install 'code' command in PATH` を実行して有効化）。

CLI からのインストール例:

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension eamodio.gitlens
code --install-extension editorconfig.editorconfig
```

また、プロジェクト側で推奨リストを設定しています: [.vscode/extensions.json](.vscode/extensions.json)

## トラブルシューティング（よくある問題）
- `code` コマンドが使えない: コマンドパレットから `Shell Command: Install 'code' command in PATH` を実行してください。
- Node バージョンが古い: `node -v` で確認し、必要なら `nvm` 等で更新してください。
- 依存インストールでエラーが出る: `node_modules` を削除して再度 `npm install` を試してください。

## 主要 npm スクリプト
- `npm run dev` — 開発サーバを起動（Vite）
- `npm run build` — 本番用にビルド
- `npm run preview` — ビルド後のローカルプレビュー
- `npm run lint` — ESLint を実行

---
質問や追加したいセットアップがあれば教えてください。次はワークショップ用の実習手順（課題ファイルや説明）を追加できます。
