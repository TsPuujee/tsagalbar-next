/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://tsagalbar.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  additionalPaths: async (_config) => {
    // Define all static routes
    const routes = [
      { loc: '/', priority: 1.0, changefreq: 'daily' },
      { loc: '/hair-cutting-calendar', priority: 0.8, changefreq: 'daily' },
      { loc: '/tsagaan-sar', priority: 0.8, changefreq: 'weekly' },
    ];
    
    return routes.map((route) => ({
      loc: route.loc,
      changefreq: route.changefreq,
      priority: route.priority,
      lastmod: new Date().toISOString(),
    }));
  },
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
