import rss from '@astrojs/rss';
import { getWriting } from '../lib/utils';
import { site } from '../site.config';

export async function GET(context) {
  const posts = await getWriting();
  return rss({
    title: `${site.name}’s writing`,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/writing/${post.id}/`,
      categories: [post.data.category],
    })),
  });
}
