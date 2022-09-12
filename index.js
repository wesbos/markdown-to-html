async function convert(markdown) {
  const { unified } = await import('unified');
  const remarkParse = await import('remark-parse');
  const remarkVscode = await import('gatsby-remark-vscode');
  const rehypeRaw = await import('rehype-raw');
  const remarkToRehype = await import('remark-rehype');
  const remarkGfm = await import('remark-gfm');
  const rehypeStringify = await import('rehype-stringify');
  const remarkCodeTitles = await import('remark-code-titles');

  const processor = unified()
    .use(remarkParse.default)
    .use(remarkGfm.default)
    .use(remarkCodeTitles.default)
    .use(remarkVscode.default.remarkPlugin, {
      theme: 'Cobalt2',
      extensions: [`theme-cobalt2`],
    })
    .use(remarkToRehype.default, { allowDangerousHtml: true })
    .use(rehypeRaw.default)
    .use(rehypeStringify.default)

  const file = await processor.process(markdown)

  return file.value;
}

module.exports = { convert };
