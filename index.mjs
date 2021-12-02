import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkVscode from 'gatsby-remark-vscode';
import rehypeRaw from 'rehype-raw';
import remarkToRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkVscode.remarkPlugin, {
    theme: 'Cobalt2',
    extensions: [`theme-cobalt2`],
  })
  .use(remarkToRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify)

export async function convert(markdown) {
  const file = await processor.process(markdown)
  return file.value;
}
