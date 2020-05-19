const urlParse = require('url').parse
const urlResolve = require('url').resolve
const slug = require('slug')
const path = require('path')
const cheerio = require('cheerio')

function urlToFilepath(url) {
  const parsedUrl = urlParse(url);
  const urlPath = parsedUrl.path.split('/')
    .filter(component => component !== '')
    .map(component => slug(component))
    .join('/');
  let filepath = path.join(parsedUrl.hostname, urlPath)
  if(!path.extname(filepath).match(/htm/)) {
    filepath += '.html'
  }
  return filepath
}

function getLinkUrl(currentUrl, link) {
  const url = urlResolve(currentUrl, link.attribs.href || '')
  const parsedUrl = urlParse(url)
  const parsedCurrentUrl = urlParse(currentUrl)
  if(parsedUrl.hostname !== parsedCurrentUrl.hostname) return null
  return url
}

function getPageLinks(currentUrl, body) {
  const $ = cheerio.load(body)
  const links = $('a').map((index, link) => getLinkUrl(currentUrl, link))
    .filter(link => link !== null)
  return links.toArray()
}

module.exports = { urlToFilepath, getPageLinks }