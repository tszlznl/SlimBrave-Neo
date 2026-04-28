<div align="center">

# SlimBrave Neo

<img src="https://github.com/user-attachments/assets/3e90a996-a74a-4ca1-bea6-0869275bab58" width="160" height="240">

**Debloat and harden Brave Browser on Linux, macOS, and Windows.**

[![Python 3](https://img.shields.io/badge/Python_3-stdlib_only-3776AB?logo=python&logoColor=white)](https://python.org)
[![No Dependencies](https://img.shields.io/badge/Dependencies-None-brightgreen)]()
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)
[![Linux](https://img.shields.io/badge/Linux-Supported-FCC624?logo=linux&logoColor=black)]()
[![macOS](https://img.shields.io/badge/macOS-Supported-000000?logo=apple&logoColor=white)]()
[![Windows](https://img.shields.io/badge/Windows-Supported-0078D6?logo=windows&logoColor=white)]()

SlimBrave Neo uses Chromium enterprise managed policies to disable telemetry,
bloat, and unwanted features from Brave Browser. No browser extensions,
no hacks, just clean policy enforcement that Brave respects natively.

</div>

> [!IMPORTANT]
> **The only official source of SlimBrave Neo is this repository:**
> [`github.com/ChaoticSi1ence/SlimBrave-Neo`](https://github.com/ChaoticSi1ence/SlimBrave-Neo)
>
> This project ships **source code only** — Python and PowerShell scripts you can read before running.
> **There are no official `.exe`, `.msi`, `.dmg`, `.pkg`, installers, or compiled binaries.**
> If you find a download claiming to be SlimBrave-Neo elsewhere, it is not from this project. See [`SECURITY.md`](SECURITY.md).

---

## 中文说明（使用与路径）

SlimBrave Neo 通过 Chromium/Brave 的“企业托管策略（Managed Policies）”来关闭遥测、精简功能并增强隐私安全。它不会修改浏览器安装文件、不需要扩展或注入。

### 代码与文档入口

- Linux 入口脚本：[`slimbrave-linux.py`](slimbrave-linux.py)
- macOS 入口脚本：[`slimbrave-mac.py`](slimbrave-mac.py)
- Windows 入口脚本：[`SlimBrave.ps1`](SlimBrave.ps1)
- 预置配置（可导入/导出）：[`Presets/`](Presets/)
- 代码 Wiki（中文，包含架构/模块/关键函数/依赖/运行方式）：[`docs/wiki/README.md`](docs/wiki/README.md)

### 三平台策略写入路径（Policy Locations）

- Linux：`/etc/brave/policies/managed/slimbrave.json`
- macOS：`/Library/Managed Preferences/com.brave.Browser.plist`
- Windows（注册表）：
  - `HKLM:\SOFTWARE\Policies\BraveSoftware\Brave`
  - `HKCU:\SOFTWARE\Policies\BraveSoftware\Brave`（兜底）

### 界面语言

当前仓库版本的 Linux/macOS TUI、CLI 帮助信息，以及 Windows GUI/弹窗文案均已提供中文显示（策略键名保持英文不变）。

<div align="center">

---

<img src="assets/tui-screenshot.png" width="620" alt="SlimBrave Neo Linux TUI">

*Interactive curses TUI. Zero dependencies, runs in any terminal.*

</div>

---

## Quick Start - Linux

```bash
git clone https://github.com/ChaoticSi1ence/SlimBrave-Neo.git
cd SlimBrave-Neo
sudo python3 slimbrave-linux.py
```

That's it. No `pip install`, no `jq`, no external dependencies. Just Python 3 and root.

### CLI Mode (non-interactive)

```bash
sudo python3 slimbrave-linux.py --import "./Presets/Maximum Privacy Preset.json"
sudo python3 slimbrave-linux.py --export ~/SlimBraveNeoSettings.json
sudo python3 slimbrave-linux.py --reset
```

After applying, restart Brave and verify at `brave://policy`.

---

## Quick Start - macOS

```bash
git clone https://github.com/ChaoticSi1ence/SlimBrave-Neo.git
cd SlimBrave-Neo
sudo python3 slimbrave-mac.py
```

Policies are written to `/Library/Managed Preferences/com.brave.Browser.plist`. Requires root.

### CLI Mode (non-interactive)

```bash
sudo python3 slimbrave-mac.py --import "./Presets/Maximum Privacy Preset.json"
sudo python3 slimbrave-mac.py --export ~/SlimBraveNeoSettings.json
sudo python3 slimbrave-mac.py --reset
```

After applying, restart Brave and verify at `brave://policy`.

---

## Quick Start - Windows

```powershell
iwr "https://raw.githubusercontent.com/ChaoticSi1ence/SlimBrave-Neo/main/SlimBrave.ps1" -OutFile "SlimBrave.ps1"; .\SlimBrave.ps1
```

Requires Administrator privileges.

---

## Features

### Telemetry & Reporting
- Disable Metrics Reporting
- Disable Safe Browsing Reporting
- Disable URL Data Collection
- Disable P3A Analytics
- Disable Stats Ping

### Privacy & Security
- Disable Safe Browsing
- Disable Autofill (Addresses & Credit Cards)
- Disable Password Manager
- Disable Browser Sign-in
- Enable Do Not Track
- Enable Global Privacy Control
- Enable De-AMP (strip Google AMP wrappers)
- Enable Debouncing (skip known tracking redirect hops)
- Strip Tracking URL Parameters
- Reduce Language Fingerprinting
- Disable WebRTC IP Leak
- Disable QUIC Protocol
- Block Third Party Cookies
- Force Google SafeSearch
- Disable / Force Incognito Mode (mutually exclusive)

### Brave Features
- Disable Brave Rewards
- Disable Brave Wallet
- Disable Brave VPN
- Disable Brave AI Chat
- Disable Brave Shields
- Disable Brave News
- Disable Brave Talk
- Disable Brave Playlist
- Disable Web Discovery
- Disable Speedreader
- Disable Tor
- Disable Sync
- Disable IPFS

### Performance & Bloat
- Disable Background Mode
- Disable Shopping List
- Always Open PDF Externally
- Disable Translate
- Disable Spellcheck
- Disable Search Suggestions
- Disable Printing
- Disable Default Browser Prompt
- Disable Developer Tools
- Disable Wayback Machine

### DNS Over HTTPS
- Four modes: `automatic`, `off`, `secure`, `custom`
- Custom DoH template URL support (e.g. `https://cloudflare-dns.com/dns-query`)
- Inline editable template field in the TUI

---

## CLI Reference

| Flag | Description |
|------|-------------|
| `--import PATH` | Import a SlimBrave Neo JSON config and apply policies |
| `--export PATH` | Export current policy to a SlimBrave Neo JSON config |
| `--reset` | Remove the managed policy file |
| `--policy-file PATH` | Override policy file path |
| `--doh-templates URL` | Set custom DNS-over-HTTPS template URL |
| `-h`, `--help` | Show help |

Import/export uses the same JSON format as the Windows PowerShell version.
Configs are cross-platform compatible.

### CLI 参数说明（中文，Linux/macOS）

| 参数 | 说明 |
|------|------|
| `--import PATH` | 导入 SlimBrave Neo JSON 配置并应用策略 |
| `--export PATH` | 将当前策略导出为 SlimBrave Neo JSON 配置 |
| `--reset` | 删除 SlimBrave Neo 托管策略文件 |
| `--policy-file PATH` | 覆盖策略文件路径（会限制在允许目录内） |
| `--doh-templates URL` | 设置 DoH 模板 URL（用于 custom DNS 模式） |
| `-h`, `--help` | 显示帮助 |

允许的 `--policy-file` 目录（安全限制）：

- Linux：`/etc/brave/policies/managed`、`/etc/chromium/policies/managed`
- macOS：`/Library/Managed Preferences`、`/Library/Preferences`

---

<details>
<summary><strong>Presets</strong></summary>

### Maximum Privacy Preset
- Telemetry: Blocks all reporting (metrics, safe browsing, URL collection, feedback).
- Privacy: Disables autofill, password manager, sign-in, WebRTC leaks, QUIC, and forces Do Not Track.
- Brave Features: Kills Rewards, Wallet, VPN, AI Chat, Tor, and Sync.
- Performance: Disables background processes, recommendations, and bloat.
- DNS: Uses plain DNS (no HTTPS) to prevent potential logging by DoH providers.
- Best for: Paranoid users, journalists, activists, or anyone who wants Brave as private as possible.

### Balanced Privacy Preset
- Telemetry: Blocks all tracking but keeps basic safe browsing.
- Privacy: Blocks third-party cookies, enables Do Not Track, but allows password manager and autofill for addresses.
- Brave Features: Disables Rewards, Wallet, VPN, and AI features.
- Performance: Turns off background services and ads.
- DNS: Uses automatic DoH (lets Brave choose the fastest secure DNS).
- Best for: Most users who want privacy but still need convenience features.

### Performance Focused Preset
- Telemetry: Only blocks metrics and feedback surveys (keeps some safe browsing).
- Brave Features: Disables Rewards, Wallet, VPN, and AI to declutter the browser.
- Performance: Kills background processes, shopping features, and promotions.
- DNS: Automatic DoH for a balance of speed and security.
- Best for: Users who want a faster, cleaner Brave without extreme privacy tweaks.

### Developer Preset
- Telemetry: Blocks all reporting.
- Brave Features: Disables Rewards, Wallet, and VPN but keeps developer tools.
- Performance: Turns off background services and ads.
- DNS: Automatic DoH (default secure DNS).
- Best for: Developers who need dev tools but still want telemetry and ads disabled.

### Strict Parental Controls Preset
- Privacy: Blocks incognito mode, forces Google SafeSearch, and disables sign-in.
- Brave Features: Disables Rewards, Wallet, VPN, Tor, and dev tools.
- DNS: Uses custom DoH (can be set to a family-friendly DNS like Cloudflare for Families).
- Best for: Parents, schools, or workplaces that need restricted browsing.

</details>

---

## How It Works

SlimBrave Neo writes Chromium [managed enterprise policies](https://chromeenterprise.google/policies/)
to platform-specific locations. Brave reads these on startup and enforces the policies. No browser modifications needed.

- **Linux:** `/etc/brave/policies/managed/slimbrave.json`
- **macOS:** `/Library/Managed Preferences/com.brave.Browser.plist`
- **Windows:** Registry keys via PowerShell
  - `HKLM:\SOFTWARE\Policies\BraveSoftware\Brave`
  - `HKCU:\SOFTWARE\Policies\BraveSoftware\Brave` (fallback)

- Auto-detects Brave installations: Arch (`brave-bin`), deb/rpm, Flatpak, Snap, macOS App, and PATH fallback
- Reads existing policies on startup and pre-checks matching features
- Full overwrite on Apply, so unchecked features are cleanly removed
- Import/export compatible with Windows PowerShell version (handles UTF-16 BOM encoding)

---

<details>
<summary><strong>Requirements</strong></summary>

**Linux:**
- Python 3 (no external dependencies)
- Root privileges (`sudo`)
- Brave Browser installed (any packaging method)

**macOS:**
- Python 3 (no external dependencies)
- Root privileges (`sudo`)
- Brave Browser installed

**Windows:**
- Windows 10/11
- PowerShell
- Administrator privileges

</details>

<details>
<summary><strong>Windows: "Running Scripts is Disabled on this System"</strong></summary>

Run this command in PowerShell:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

</details>

---

### Roadmap
- [x] Add preset configurations (Privacy, Performance, etc.)
- [x] Import/export settings (cross-platform compatible)
- [x] Add Linux support with full interactive TUI
- [x] DNS-over-HTTPS with custom template URLs
- [x] CLI mode for scripting and automation
- [x] macOS support via managed plist policies

---

## Contributors

- **[@alsyundawy](https://github.com/alsyundawy)** - macOS version

---

<div align="center">

**Like this project? Give it a star!**

Made with Python and PowerShell.
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)

</div>
