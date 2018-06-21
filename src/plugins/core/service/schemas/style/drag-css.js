/**
 * 从 http://www.w3school.com.cn/cssref/index.asp 抓取css属性手册
 */

/**
 * $ jquery对象
 */
(async function ($) {

  async function sleep(interval) {
    return new Promise((resolve) => {
      setTimeout(resolve, interval)
    })
  }

  const items = {}
  const categories = {}

  const categoryTables = $('.dataintable')
  for (let i = 0; i < categoryTables.length; i++) {
    const table = categoryTables.eq(i)
    const title = table.prev('h2').text().trim()
    const match = /（(.+)\）/.exec(title)
    const category = match ? match[1].trim() : title
    categories[category] = {
      name: category,
      title
    }
    const trs = table.find('tr:gt(0)')
    for (let j = 0; j < trs.length; j++) {
      //         for (let j = 1; j < 2; j++) {
      const tr = trs.eq(j)
      const nameTd = tr.find('td:eq(0)')
      const name = nameTd.text().trim()
      const href = nameTd.find('a').attr('href')
      const description = tr.find('td:eq(1)').text().trim()
      const item = items[name] = {
        name,
        href,
        category,
        description
      }
      console.log(name)

      if (href) {
        const res = await $.ajax({
          url: href,
          dataType: 'html',
          contentType: 'application/x-www-form-urlencoded; charset=GBK',
          beforeSend: function (xhr) {
            xhr.overrideMimeType('text/html; charset=GBK')
          }
        })

        const html = $(`<div>${/<body(?:[^>]*)>([\s\S]+)<\/body>/g.exec(res)[1]}</div>`)

        const exampleCode = html.find('h2:contains(实例)').parent().find('pre').text().trim()
        const exampleDesc = html.find('h2:contains(实例)').parent().find('p:eq(0)').text().trim()
        const browserSupport = html.find('h2:contains(浏览器支持)').parent().find('p:eq(0)').text().trim()
        const browserSupportDesc = html.find('h2:contains(浏览器支持)').parent().find('p:eq(1)').text().trim()

        const defaultValue = html.find('h2:contains(定义和用法)').parent().find('th:contains(默认值)').next('td').text().trim()
        const inheritable = html.find('h2:contains(定义和用法)').parent().find('th:contains(继承性)').next('td').text().trim() === 'yes'
        const version = html.find('h2:contains(定义和用法)').parent().find('th:contains(版本)').next('td').text().trim()
        const jsSyntax = html.find('h2:contains(定义和用法)').parent().find('th:contains(语法)').next('td').text().trim()
        const usecaseDesc = html.find('h2:contains(定义和用法)').parent().find('h3').nextUntil('table').text().trim()
        const cssSyntax = html.find('h2:contains(语法)').parent().find('pre').text().trim()

        let valueListTable = html.find('h2:contains(可能的值)').parent().find('table')
        if (valueListTable.length === 0) {
          valueListTable = html.find('h2:contains(语法)').parent().find('table')
        }
        const valueList = Array.from(valueListTable.find('tr:gt(0)')).map(tr => ({
          value: $(tr).find('td').eq(0).text().trim(),
          desc: $(tr).find('td').eq(1).text().trim()
        }))
        Object.assign(item, {
          exampleCode,
          exampleDesc,
          browserSupport,
          browserSupportDesc,
          defaultValue,
          inheritable,
          version,
          jsSyntax,
          usecaseDesc,
          cssSyntax,
          valueList
        })
        await sleep(1000)
      }
    }
  }
  console.log(JSON.stringify({
    categories,
    items
  }))
})()
