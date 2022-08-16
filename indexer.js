const axios = require('axios').default
const fs = require('fs')

fs.rm(process.cwd() + '/config/Jackett/Indexers', { recursive: true }, (err) => {
  fs.mkdirSync(process.cwd() + '/config/Jackett/Indexers')
})

fs.readFile(process.cwd() + '/sites/indexers.txt', 'utf8', (err, res) => {
  if (err) throw err

  res = res.split('\n')

  for (site of res) {
    const common = async (site) => {
      try {
        let response

        try {
          response = await axios.get(
            `https://raw.githubusercontent.com/Jackett/Jackett/master/src/Jackett.Common/Definitions/${site}.yml`
          )
          response = response.data.split('links:')[1]
        } catch (err) {
          if (err.code !== 200) {
            try {
              response = await axios.get(
                `https://raw.githubusercontent.com/Jackett/Jackett/master/src/Jackett.Common/Indexers/Feeds/${site}.cs`
              )
              response = response.data.split('link:')[1]
            } catch (err) {
              if (err.code !== 200) {
                try {
                  response = await axios.get(
                    `https://raw.githubusercontent.com/Jackett/Jackett/master/src/Jackett.Common/Indexers/${site}.cs`
                  )
                  response = response.data.split('link:')[1]
                } catch (err) {
                  if (err.code !== 200) {
                    throw new Error('Next...!')
                  }
                }
              }
            }
          }
        }

        response = response.match(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        )[0]

        console.log(response, ` ~ ${site.toLowerCase()}.json`)

        response = `[
          {
            "id": "sitelink",
            "type": "inputstring",
            "name": "Site Link",
            "value": "${response}"
          }
        ]`

        fs.writeFileSync(process.cwd() + `/config/Jackett/Indexers/${site.toLowerCase()}.json`, response, err)
      } catch (err) {
        console.log(site, err)
      }
    }

    common(site)
  }
})

const telly = `
[
  {
    "id": "sitelink",
    "type": "inputstring",
    "name": "Site Link",
    "value": "https://telly.wtf/"
  },
  {
    "id": "apikey",
    "type": "inputstring",
    "name": "APIKey",
    "value": "IZhgQI5y8giqqhjUqN1hDwFasC2xsOmeAxzESaG5Z9zvxUqPxPxcO9ao8gMdJdHXEMvZ5K1SKQNx7VMCDyzMJYvjE9h9QNG8jiGz"
  },
]
`

fs.writeFileSync(process.cwd() + `/config/Jackett/Indexers/tellytorrent-api.json`, telly)
