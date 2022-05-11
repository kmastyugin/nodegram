const { uuid } = require('uuidv4')
const path = require('path')

module.exports = async (req, res, next) => {
    const sampleFile = req.files.image
    let sampleFileName = sampleFile.name.match(/([\w]+)\.([\w]+)/i)
    sampleFileName = `${uuid()}.${sampleFileName[sampleFileName.length-1]}`
    req.uploadFilePath = path.join('/images', sampleFileName)
    
    next()
}