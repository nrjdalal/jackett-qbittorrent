mkdir -p ~/Library/Application\ Support/qBittorrent/nova3/engines/

curl https://raw.githubusercontent.com/qbittorrent/search-plugins/master/nova3/engines/jackett.py | cat >~/Library/Application\ Support/qBittorrent/nova3/engines/jackett.py

cat >~/Library/Application\ Support/qBittorrent/nova3/engines/jackett.json <<jackett
{
  "api_key": "n4cv51k835sixcb9", 
  "tracker_first": false, 
  "url": "https://n4cv51k835sixcb9.herokuapp.com"
}
jackett
