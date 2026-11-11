#!/bin/zsh
# Renders social.html into PNGs with headless Chrome. Run from anywhere: zsh marketing/friends-of-the-dash/social/render.sh
cd "${0:A:h}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for spec in "c1 1080 1350 friends-carousel-1-invite" "c2 1080 1350 friends-carousel-2-benefits" "c3 1080 1350 friends-carousel-3-impact" "st 1080 1920 friends-story" "wd 1200 630 friends-facebook-linkedin"; do
  set -- ${=spec}
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=6000 \
    --window-size=$2,$3 --screenshot="$PWD/$4.png" "file://$PWD/social.html?a=$1" 2>/dev/null
done
ls -la *.png
