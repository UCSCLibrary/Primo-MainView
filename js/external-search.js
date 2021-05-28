app.value('searchTargets', [{
    "name": "Search in Worldcat",
    "desc": "for advanced filtering options",
    "url": "https://110110.on.worldcat.org/v2/search?",
    "img": "custom/01CDL_SCR_INST-USCS/img/worldcat.png",
    mapping: function (queries, filters) {
      const query_mappings = {
        'any': 'kw',
        'title': 'ti',
        'creator': 'au',
        'subject': 'su',
        'isbn': 'bn',
        'issn': 'n2'
      }
      try {
        return 'queryString=' + queries.map(part => {
          let terms = part.split(',')
          let type = query_mappings[terms[0]] || 'kw'
          let string = terms[2] || ''
          let join = terms[3] || ''
          return type + ':' + string + ' ' + join + ' '
        }).join('')
      }
      catch (e) {
        return ''
      }
    }
  }
])
