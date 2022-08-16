mkdir -p ~/Library/Application\ Support/qBittorrent/nova3/engines/

curl https://raw.githubusercontent.com/qbittorrent/search-plugins/master/nova3/engines/jackett.py | cat >~/Library/Application\ Support/qBittorrent/nova3/engines/jackett.py

cat >~/Library/Application\ Support/qBittorrent/nova3/engines/jackett.json <<jackett
{
  "api_key": "qbittorrent", 
  "tracker_first": false, 
  "url": "https://verosearch.herokuapp.com"
}
jackett
