import './preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
  <html>
    <head>
      <style>html { background-color: white; }</style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;">' + err + '</div>';
          console.error(err);
        };

        // Returns asynchronous errors
        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error)
        });

        // Returns synchronous errors
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        }, false);
      </script>
    </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // resets the iframe code execution
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        className="preview-iframe"
        style={{ backgroundColor: 'white' }}
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
