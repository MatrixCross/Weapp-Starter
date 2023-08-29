import https from 'https'
import fs from 'fs'
type jsonDefine = {
  iconList: string[]
}
let fromPath = '../iconify.json' // json读取位置
let distPath = './src/assets/svg/iconify.ts' // 文件写入路径
process.argv.forEach((argv) => {
  if (argv.split('=')[0] === 'path') {
    distPath = argv.split('=')[1]
  } else if (argv.split('=')[0] === 'json') {
    fromPath = argv.split('=')[1]
  }
})

const json = require(fromPath) as jsonDefine

// 代码模板
const tepmlate = `/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// 该文件由脚本自动生成，请勿手动修改
export default {code
}`

// 代码生成逻辑
async function genCode() {
  if (!json.iconList || !json.iconList.length) {
    console.log('请正确设置iconList')
    return
  }
  const iconSvgMap: Record<string, string> = {}
  for (let index = 0; index < json.iconList.length; index++) {
    const iconName = json.iconList[index]
    const res = await new Promise<string>((resolve) => {
      https.get(`https://api.iconify.design/${iconName}.svg`, (res: any) => {
        let data = ''
        res.on('data', (chunk: string) => {
          data += chunk
        })
        res.on('end', () => {
          resolve(data)
        })
      })
    })
    iconSvgMap[iconName] = res
  }
  let code = ''
  for (const [name, svg] of Object.entries(iconSvgMap)) {
    code += `\n  '${name}': '${svg}',`
  }
  code = tepmlate.replace('code', code)
  fs.writeFileSync(distPath, code, {
    encoding: 'utf8',
  })
  console.log('代码已生成在：' + distPath)
}

genCode()
