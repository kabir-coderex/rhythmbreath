# RhythmBreathe Desktop App (Tauri)

## Prerequisites

Tauri requires the **Rust** toolchain (`cargo` & `rustc`) to compile native desktop binaries for macOS and Windows.

### 1. Install Rust (macOS / Linux)
Run the standard Rust installer command in your terminal:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"
```

### 2. Install Node Dependencies
Inside the `pc` directory:

```bash
npm install
```

## Available Commands

- **Development Mode** (launches native desktop app window):
  ```bash
  npm run desktop:dev
  ```

- **Production Build** (compiles `.app` / `.dmg` installer bundle):
  ```bash
  npm run desktop:build
  ```
