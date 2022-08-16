```sh
brew install jackett
brew services start jackett
mkdir -p ~/Library/Application\ Support/qBittorrent/nova3/engines/
curl https://raw.githubusercontent.com/qbittorrent/search-plugins/master/nova3/engines/jackett.py | cat > ~/Library/Application\ Support/qBittorrent/nova3/engines/jackett.py
open http://127.0.0.1:9117/
```
