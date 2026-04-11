#!/usr/bin/env bash
# Run from repo root: bash migrate-article-images.sh
set -e

DEST="public/images/articles"
mkdir -p "$DEST"

migrate() {
  local slug="$1"
  local url="$2"
  local ext="${url##*.}"
  ext="${ext%%\?*}"
  local filename="${slug}.${ext}"
  local destpath="${DEST}/${filename}"
  local mdfile="src/content/articles/${slug}.md"

  echo "Downloading $filename..."
  curl -sL "$url" -o "$destpath"

  if [ -f "$mdfile" ]; then
    sed -i '' "s|thumbnail: \"${url}\"|thumbnail: \"/images/articles/${filename}\"|" "$mdfile"
    echo "  Updated $mdfile"
  else
    echo "  WARNING: $mdfile not found — update thumbnail manually"
  fi
}

migrate "the-neurobiology-of-quitting"         "https://static.wixstatic.com/media/50feef_1852014d12c4471f8a8ad12898fe6c86~mv2.png"
migrate "proximal-abandonment-the-modern-mental-health-dilemma" "https://static.wixstatic.com/media/nsplsh_bd7a1c488f7d4195873547fbe1e4784e~mv2.jpg"
migrate "free-costs-focus"                     "https://static.wixstatic.com/media/11062b_702aa61483f74d28a8835f37022071af~mv2.jpg"
migrate "satisfy-the-beast"                    "https://static.wixstatic.com/media/nsplsh_4270482d2d7570526c4373~mv2_d_1982_2973_s_2.jpg"
migrate "on-the-non-linearity-of-grief"        "https://static.wixstatic.com/media/50feef_d0223889a23d4433999bfb7bfa954189~mv2.png"
migrate "the-neurobiology-of-fuck-it"          "https://static.wixstatic.com/media/11062b_4d7e9215d20a40159c6f78f78817520e~mv2.jpg"
migrate "the-chronic-stress-adapted-mind-understanding-inattentive-adhd-avoidant-attachment-and-dissociati" "https://static.wixstatic.com/media/50feef_1f93e54c2bd140699364fcffebc51cdd~mv2.png"
migrate "putting-work-back-in-reward-for-a-better-life" "https://static.wixstatic.com/media/11062b_77b9163a304d4b80bbfb184acd51443c~mv2.jpg"
migrate "addiction-is-supplementation-not-self-medication" "https://static.wixstatic.com/media/nsplsh_90ab0637fad644faa2c961ce26ae1338~mv2.jpg"
migrate "why-you-might-want-to-be-a-crappy-meditator" "https://static.wixstatic.com/media/11062b_8652cbafe56e445aa66870338829591e~mv2.jpg"
migrate "all-excuses-are-valid-but-don-t-get-results" "https://static.wixstatic.com/media/11062b_83d0d117e4054bcab53dc1ac33aac610~mv2.jpg"
migrate "the-attachment-authenticity-war"      "https://static.wixstatic.com/media/11062b_48e258f2eea64a309fe372a2567324e0~mv2.jpg"
migrate "finish-line-freak-out"                "https://static.wixstatic.com/media/11062b_2774e9d666c84ff59c157e2f26ff326d~mv2.jpg"
migrate "the-silent-nightmare-of-women-with-adhd" "https://static.wixstatic.com/media/50feef_aeb2b9cc1ae34a6bba4ffca5846d78e8~mv2.png"
migrate "conservatives-are-born-liberals-are-made" "https://static.wixstatic.com/media/0a8802f2cb234551bc855be44c0f34de.jpg"
migrate "rats-who-love-pain"                   "https://static.wixstatic.com/media/50feef_ccdc740f7eba4398b230c5903690bd4c~mv2.jpg"

echo ""
echo "Done. Verify with:"
echo "  grep -r 'wixstatic' src/content/articles/"