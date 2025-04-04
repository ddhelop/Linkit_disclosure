/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.linkit.im',
  generateRobotsTxt: true, // robots.txt 생성 여부
  exclude: [], // 제외할 경로 설정
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [''], // 제외할 경로 설정
  // 추가 설정이 필요한 경우 여기에 설정
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
