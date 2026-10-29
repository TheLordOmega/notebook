# Zed + GitHub Codespaces + Hackatime — the setup, and the reasons

**Applies to:** `~/Documents/Terra/Notebook` (repo root) with the Vite app in `my-react-app/`.
**Checked against:** Zed 1.23.2 (Flatpak `dev.zed.Zed`), gh 2.101.0, Node 22.23.1, npm 10.9.8, Vite 8.3.5, React 19.3.1.
**Last verified:** 29 Oct 2026.

---

## 0. What "synced" can and cannot mean

Three different things get called "sync". Only the first one is actual syncing.

1. **Files** — the same source exists on the laptop and in the Codespace.
2. **Time** — heartbeats from both editors reach Hackatime.
3. **Identity** — both report the *same* project name to Hackatime.

| Goal                            | Automatic by default?        | Why                                                                                                                                                                                         |
| ------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Files moving laptop ↔ Codespace | **No**                       | Codespaces does not auto-commit or auto-push. The browser editor's autosave writes to the Codespace disk only. `git.autofetch` fetches refs for display; it never pulls, commits or pushes. |
| Files, with zero copying        | Only with **one filesystem** | Zed can open a folder *inside* the Codespace over SSH. Then phone and desktop edit the same bytes because there is only one copy.                                                           |
| Heartbeats from both places     | **Yes**, once                | Install the tracker once per environment.                                                                                                                                                   |
| Same project name everywhere    | **Yes**, once                | A `.wakatime-project` file in the repo.                                                                                                                                                     |

**Recommendation for this project:** git as the sync layer, Zed locally, Codespaces on the phone.

Why not the one-filesystem trick as the default:
- Local Zed's tracking is the documented, working path; remote-SSH tracking is plausible but unverified (§3.4 and §4).
- Your Zed is a Flatpak and your `gh` lives in `/home/linuxbrew`, so the SSH bridge needs an extra permission grant to work at all (§4).
- With git you can keep coding with no network.

The cost is one two-command ritual (§1.4). There is no supported "auto-push" switch: anything claiming to be one is a script or extension with its own failure modes.

---

## 1. One repo, two editors

### 1.1 Already done on this machine

- `.wakatime-project` at the repo root **and** inside `my-react-app/`, both containing `Notebook`. Opening either folder therefore reports the same project.
- `git init -b main` in `~/Documents/Terra/Notebook`.
- `.devcontainer/devcontainer.json` — every new Codespace installs the Hackatime tracker, Node, and your npm dependencies automatically.

Not done, because it needs your GitHub account: the first commit, the remote, the push. Those are §1.2.

### 1.2 Put it on GitHub

```bash
cd ~/Documents/Terra/Notebook
git add -A
git commit -m "Start notebook project"
gh repo create notebook --private --source=. --push
```

`gh` is already authenticated as **TheLordOmega** here, and `--source=. --push` creates the repo and pushes in one step. Private is the right default for a learning project.

Verify: `gh repo view --web`.

Why a repo is not optional: Codespaces is a GitHub feature — no repo, no Codespace. It is also the only copy that survives a dead laptop.

### 1.3 Create the Codespace once

Repo page → **Code → Codespaces → Create codespace on main**, or:

```bash
gh codespace create -R TheLordOmega/notebook
```

It spends a minute building from `.devcontainer/devcontainer.json`, then runs `npm install` inside `my-react-app`.

On the phone: github.com → the repo → **Code → Codespaces** → open the existing one. That is real VS Code in the browser with a container behind it — the same container, same files.

### 1.4 The ritual — this *is* the sync

Start of every session, in whichever place you are:

```bash
git pull --rebase --autostash
```

End of every session:

```bash
git add -A && git commit -m "wip" && git push
```

Make each one word by adding this to `~/.bashrc`:

```bash
alias nb-up='cd ~/Documents/Terra/Notebook && git pull --rebase --autostash'
alias nb-down='cd ~/Documents/Terra/Notebook && git add -A && (git commit -m "wip $(date +%H:%M)" || true) && git push'
```

Then `source ~/.bashrc`. `nb-up` before you start typing, `nb-down` before you close the lid.

Rules that matter more than the commands:

- **Pull before editing, not after.** A conflict in a one-file app is trivial; a conflict in the stroke format is not.
- **Uncommitted work exists in one place only.** A Codespace stops after 30 minutes idle by default, and stopped Codespaces are deleted after 30 days by default — unpushed work included, with no warning.
- **Never edit the same file in both places at once.** Pick one, push, switch.
- Free tier is 120 core-hours/month. A 2-core machine burns 2 per hour, so ~60 wall-clock hours. A 40-hour project fits only if you stop the Codespace (`gh codespace stop`) when you are done.

---

## 2. Project identity: `.wakatime-project`

Hackatime groups heartbeats by the project name the tracker sends. `wakatime-cli` decides that name in this order:

1. `.wakatime-project` file
2. project map in the config
3. version control — **the local folder name**, not the GitHub repo name
4. the editor's project name

Step 3 is the trap. `Terra/Notebook` on the laptop and `/workspaces/notebook` in the Codespace are different strings, so you would get two Hackatime projects and neither total would be your real 40 hours. Opening `my-react-app/` directly instead of the repo root adds a third.

The file I added fixes that with one line:

```text
Notebook
```

**Do not rename it later.** Hackatime has no rename or merge for projects; its documentation says distinct names are distinct projects, and the rename request is still open upstream. Changing the file only changes *future* heartbeats.

Optional but useful: Hackatime's project page can associate the project with the GitHub repo, which links your commit activity to the same project.

---

## 3. Hackatime, in both editors

### 3.1 The config every WakaTime client reads

`~/.wakatime.cfg` on the laptop:

```ini
[settings]
api_url = https://hackatime.hackclub.com/api/hackatime/v1
```

Your API key comes from your Hackatime account (the editor-setup page on hackatime.hackclub.com). It is deliberately **not** in this repo — never commit it.

Why the custom URL: WakaTime clients talk to wakatime.com by default. Hackatime is API-compatible, so the endpoint is the only thing that changes. The same key works in every client.

### 3.2 Zed (desktop)

```text
Ctrl+Shift+P  →  "zed: extensions"  →  search "WakaTime"  →  Install
```

(There is no `zed` command on your PATH — the Flatpak ships only the GUI, so ignore any tutorial that starts with `zed ...`.)

How it behaves, because the behaviour is the reason your hours look the way they do: the extension is a bridge to `wakatime-ls` / `wakatime-cli`. It sends a heartbeat when a file is **opened**, on **edits** (throttled to one every two minutes) and on **save**. A project sitting open with no typing is not coding, and will not record — that is by design.

Configure the key where the CLI can read it (`~/.wakatime.cfg` above). The extension may also accept options through Zed's settings; check its README in the Extensions panel rather than guessing, because option names change between versions.

**Fix your shell first.** Every new terminal currently prints:

```text
/home/Omega/.bashrc: line 29: terminal-wakatime: command not found
```

Something in your `.bashrc` calls a terminal tracker that is not installed. Either install that tool or comment out line 29. It is a *separate* tracker from the editor extension — running both means double-counted heartbeats. I did not edit your shell config.

### 3.3 Codespaces (phone)

Two pieces; one is already in the devcontainer file, the other is a secret only you can create.

1. **Extension.** `.devcontainer/devcontainer.json` declares `hackatime.hackatime-time-tracker`, the extension Hackatime's own docs name. Do not install the unrelated extension that is simply called "Hackatime" — the docs explicitly warn it is unofficial.
2. **Key.** github.com → **Settings → Codespaces → New secret**, name it exactly `HACKATIME_API_KEY`, paste the key, grant access to the `notebook` repo. In remote/online mode the tracker reads that environment variable; OAuth sign-in does not work from inside a remote container.

After creating the secret, **stop and restart** the Codespace, otherwise the variable will not exist in it.

Do not also install upstream WakaTime in the same editor: two trackers produce duplicated heartbeats, and inflated hours are visible to organisers.

### 3.4 Prove it works, in four checks

1. **Zed:** open `my-react-app/src/App.jsx`, type a character, undo it, press save. Wait a minute → Hackatime dashboard → activity under project **Notebook**.
2. **Codespace:** edit and save a file in the browser editor, wait, check the same project row. Same project name is the thing to confirm here, not just "activity appeared".
3. **No heartbeat?** In the Codespace check `$HOME/.wakatime/wakatime.log`, or run **Hackatime: Debug** from the Command Palette. On the laptop the CLI log is `~/.wakatime/wakatime.log`. `debug = true` under `[settings]` gives verbose logging while you troubleshoot — remove it afterwards.
4. **Trust nothing until step 1 and 2 both show the same project name.** Everything else in this document is configuration that has not been exercised.

---

## 4. Optional: Zed *inside* the Codespace

Use this only if the ritual annoys you enough to trade verified tracking for true one-filesystem editing. Zed opens `/workspaces/notebook` on the remote machine, so both devices see the same bytes with no copying at all.

```bash
gh auth refresh -s codespace      # your current token lacks the codespace scope
gh codespace list                 # copy the NAME column
gh codespace ssh --config --codespace NAME > ~/.ssh/codespaces
chmod 600 ~/.ssh/codespaces
```

Then make this the **first** line of `~/.ssh/config` (create the file if it does not exist):

```sshconfig
Include ~/.ssh/codespaces
```

```bash
chmod 600 ~/.ssh/config
head -5 ~/.ssh/codespaces          # read the Host line
ssh cs.NAME.escaped-ref            # test with plain ssh first
```

Test with plain `ssh` before involving Zed. If OpenSSH cannot connect, Zed will not either.

**Your Flatpak snag.** Zed is `dev.zed.Zed` with `filesystems=home`. Home access is enough for `~/.ssh`, but `gh` is at `/home/linuxbrew/.linuxbrew/bin/gh`, which is *not* inside your home — so the generated `ProxyCommand` (it runs `gh cs ssh … --stdio`) cannot execute inside the sandbox. Fix both halves:

```bash
flatpak override --user --filesystem=/home/linuxbrew:ro dev.zed.Zed
```

then change the bare `gh` in the `ProxyCommand` line of `~/.ssh/codespaces` to `/home/linuxbrew/.linuxbrew/bin/gh`, fully quit Zed, reopen.

If that works: `Ctrl+Alt+Shift+O` (**File → Open Remote…**) → **Connect New Server** → `ssh cs.NAME.escaped-ref` → open `/workspaces/notebook`. Zed remote development needs v0.159 or newer; you have 1.23.2. Terminology worth knowing: the *UI* runs on your laptop, while *files, language servers and terminals* run in the Codespace.

**Why this is not the default:** time tracking. Zed propagates locally installed extensions to the remote, and WakaTime's Zed extension is a language-server bridge, so heartbeats *should* arrive — but no official doc or issue confirms it end-to-end over Codespaces, and the remote `wakatime-cli` would need its own `~/.wakatime.cfg` inside the container. If it silently drops heartbeats you lose exactly the hours this project exists to record. Test it on a throwaway 10-minute remote session before you trust it.

---

## 5. Why this template, and what it gave you

The app was created from Vite's official React preset:

```bash
npm create vite@latest my-react-app -- --template react
```

(Vite 8's docs use `npm create vite@latest` and then the **React → JavaScript** choice. `react-ts` is the TypeScript variant of the same thing.)

What the preset produced, and why each file exists:

| File | Purpose |
|---|---|
| `index.html` at the root, **not** in `public/` | The real entry point. Vite treats it as source code and resolves `<script type="module" src="/src/main.jsx">`. This is why there is no `index.jsx`: the HTML is the entry, `main.jsx` is the script it loads. |
| `src/main.jsx` | Mounts React — `createRoot(document.getElementById('root')).render(<App />)`. |
| `src/App.jsx` | Your first component, exported as a **default** export. |
| `vite.config.js` | Plugin wiring (`@vitejs/plugin-react`). No bundler configuration to write. |
| `package.json` | `dev` = hot-reloading server, `build` = production bundle, `preview` = serve that bundle, `lint` = oxlint in this version. |
| `public/` | Files copied verbatim into the build output. |
| `dist/` after `npm run build` | Plain HTML/JS/CSS — the only thing Capacitor needs later. |

Why this template rather than the alternatives:

- **Vite instead of Create React App.** CRA is deprecated and unmaintained; React's own documentation no longer recommends it. Vite is the current default for client-side React.
- **Not Next.js.** The plan has no server, no routes, no SSR. Next would add a framework layer to unlearn, and its output is not plain static files by default.
- **JavaScript, not TypeScript, this week.** `react-ts` exists and migration later is realistic. On day one, type errors compete with the material you are actually learning.
- **Why the shape matters for Android.** Capacitor wraps a *built* web folder: `npm run build` → `dist/`. Extra framework layers, server rendering and non-static routes all make that step harder. The template's simplicity is not cosmetic; it is the thing that lets the same code become an APK.
- **Not plain HTML/JS.** The notebook holds a list of notes and thousands of stroke points. React's state model is what keeps that from becoming manual DOM bookkeeping.

The tutorial that explains the template is Vite's own [Getting Started](https://vite.dev/guide/). It is short, and these four sections are the ones worth your time:

1. **Overview** — the dev server and the build command, which is the whole tool.
2. **Scaffolding Your First Vite Project** — the preset table, including `react` and `react-ts`.
3. **index.html and Project Root** — the paragraph that answers the `index.jsx` question permanently.
4. **Command Line Interface** — what `dev`, `build` and `preview` each do.

For the React side, [react.dev — Creating a React App](https://react.dev/learn/creating-a-react-app) explains why a build tool is needed at all and where Vite fits. Template internals: [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite).

---

## 6. Checklist

- [ ] Repo exists on GitHub and is pushed (`gh repo view --web`)
- [ ] `.wakatime-project` at the repo root **and** in `my-react-app/`, both containing `Notebook`
- [ ] Zed: WakaTime extension installed, `~/.wakatime.cfg` pointing at Hackatime
- [ ] `.bashrc` line 29 fixed or the hook removed
- [ ] Codespaces secret `HACKATIME_API_KEY` created and granted to the repo
- [ ] Codespace restarted after adding the secret
- [ ] A saved edit from Zed appears under project **Notebook**
- [ ] A saved edit from the phone appears under the *same* project
- [ ] `nb-up` / `nb-down` added to `~/.bashrc`, tested once on a throwaway change
- [ ] Codespace stopped whenever you are not using it

---

### Sources for the claims above

- Zed remote development (SSH, minimum v0.159, extension propagation): https://zed.dev/docs/remote-development
- Zed WakaTime extension behaviour (open/edit/save heartbeats, two-minute throttle): https://github.com/wakatime/zed-wakatime
- `gh codespace ssh --config` (generated host entries, ProxyCommand): https://cli.github.com/manual/gh_codespace_ssh
- WakaTime project-name detection order and `project_from_git_remote`: https://github.com/wakatime/wakatime-cli/blob/develop/USAGE.md
- Hackatime project naming and `.wakatime-project`: https://hackatime.hackclub.com/docs/configuration/projects
- Hackatime editor setup (VS Code fork, no OAuth in remote environments): https://hackatime.hackclub.com/docs/editors/vs-code
- Codespaces secrets: https://docs.github.com/en/codespaces/managing-your-codespaces/managing-your-account-specific-secrets-for-github-codespaces
- Codespaces timeouts and lifecycle: https://docs.github.com/en/codespaces/setting-your-user-preferences/setting-your-timeout-period-for-github-codespaces
- Codespaces included usage (120 core-hours): https://docs.github.com/en/billing/reference/product-usage-included
- Vite Getting Started (`index.html` as entry, presets, scripts): https://vite.dev/guide/
