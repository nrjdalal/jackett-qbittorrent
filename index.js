const fs = require('fs')

fs.readFile(process.cwd() + '/sites.txt', 'utf8', (err, res) => {
  if (err) throw err

  res = res.split('\n')

  for (site of res) {
    const name = site.split('/')[2].split('.')
    const longest = name.reduce((a, b) => {
      return a.length > b.length ? a : b
    })
    console.log(longest)
    // fs.writeFileSync(process.cwd() + '/config/Jackett/Indexers', '', err)
  }
})
