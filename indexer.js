const axios = require('axios').default
const fs = require('fs')

fs.rm(process.cwd() + '/config/Jackett/Indexers', { recursive: true }, (err) => {
  fs.mkdirSync(process.cwd() + '/config/Jackett/Indexers')
})

fs.readFile(process.cwd() + '/sites/definitions', 'utf8', (err, res) => {
  if (err) throw err

  res = res.split('\n')

  for (site of res) {
    const common = async (site) => {
      try {
        let response = await axios.get(
          `https://raw.githubusercontent.com/Jackett/Jackett/master/src/Jackett.Common/Definitions/${site}.yml`
        )

        response = response.data.match(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        )[0]

        console.log(response)

        response = `[
          {
            "id": "sitelink",
            "type": "inputstring",
            "name": "Site Link",
            "value": "${response}"
          }
        ]`

        fs.writeFileSync(process.cwd() + `/config/Jackett/Indexers/${site}.json`, response, err)
      } catch (err) {
        console.log(site, err)
      }
    }

    common(site)

    console.log('')
  }
})
