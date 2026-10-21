#!/usr/bin/env bash
# Pull Tony's public edits at full quality into assets-src/edits/ (git-ignored) so the hero and the
# video room can be cut from real footage. Same approach as Ken Sable's scripts/fetch-audio.sh.
# Needs: yt-dlp, ffmpeg, and the bgutil POT provider server on :4416 (YouTube bot-checks this host;
# the token server is what gets past it). Tony's own masters replace these when he sends them.
#   YTDLP=/path/to/yt-dlp scripts/fetch-edits.sh
set -uo pipefail
cd "$(dirname "$0")/.."
OUT=assets-src/edits; mkdir -p "$OUT"
Y=${YTDLP:-yt-dlp}
NODE=${NODE:-$(command -v node)}
# Skip the watch page: this host gets rate-limited on it. The player API alone, with a POT token and
# the Node challenge solver, lists every quality.
C=(--no-warnings --no-progress --extractor-args "youtubepot-bgutilhttp:base_url=http://127.0.0.1:4416"
   --extractor-args "youtube:player_skip=webpage;player_client=mweb"
   --js-runtimes "node:$NODE" --remote-components ejs:github --sleep-requests 3 --sleep-interval 5 --retries 3
   -f "bv*[ext=mp4][vcodec^=avc1]+ba[ext=m4a]/bv*+ba/b" --merge-output-format mp4)

while IFS='|' read -r slug id note; do
  [ -z "$slug" ] && continue
  if [ -f "$OUT/$slug.mp4" ]; then echo "skip $slug"; continue; fi
  echo "== $slug ($note)"
  "$Y" "${C[@]}" -o "$OUT/$slug.%(ext)s" "https://www.youtube.com/watch?v=$id" || echo "MISSING $slug"
done <<'LIST'
rockit|1j8R7Y7CJHs|Rollerblade, Nashville street, Zach Leavell, 2025
teampart|U6aXyUZ9cEw|Rollerblade team part
my-escape|YLcKPQl-tbo|Rollerblade, My Escape, Richard Williams, 2021
la|hraOpDyJZ0o|SK Films, Los Angeles
short-2025|_YQfCCO5nvw|Rollerblade short, vertical
LIST

for f in "$OUT"/*.mp4; do
  [ -f "$f" ] || continue
  echo "CHECK $(basename "$f") $(ffprobe -v error -select_streams v -show_entries stream=width,height,r_frame_rate:format=duration -of csv=p=0 "$f" | tr '\n' ' ')"
done
