import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { useStyles } from './styles';

export const Markdown = ({ children }: { children: string }) => {
  const styles = useStyles({});

  const components = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          css={styles.code}
          language={match[1]}
          style={oneDark}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code {...props}>{children}</code>
      );
    },
    ol: ({ node, children, ...props }: any) => {
      return <ol {...props}>{children}</ol>;
    },
    li: ({ node, children, ...props }: any) => {
      return <li {...props}>{children}</li>;
    },
    ul: ({ node, children, ...props }: any) => {
      return <ul {...props}>{children}</ul>;
    },
    strong: ({ node, children, ...props }: any) => {
      return <span {...props}>{children}</span>;
    },
    a: ({ node, children, ...props }: any) => {
      return (
        <a target="_blank" rel="noreferrer" css={styles.a} {...props}>
          {children}
        </a>
      );
    },
    h1: ({ node, children, ...props }: any) => {
      return (
        <h1 css={styles.h1} {...props}>
          {children}
        </h1>
      );
    },
    h2: ({ node, children, ...props }: any) => {
      return (
        <h2 css={styles.h2} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ node, children, ...props }: any) => {
      return (
        <h3 css={styles.h3} {...props}>
          {children}
        </h3>
      );
    },
    h4: ({ node, children, ...props }: any) => {
      return <h4 {...props}>{children}</h4>;
    },
    h5: ({ node, children, ...props }: any) => {
      return <h5 {...props}>{children}</h5>;
    },
    h6: ({ node, children, ...props }: any) => {
      return <h6 {...props}>{children}</h6>;
    },
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
      css={styles.markdown}
    >
      {children}
    </ReactMarkdown>
  );
};
