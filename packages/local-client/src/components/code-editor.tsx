import './code-editor.css';
import { useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  editor: any;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>(null);

  const onEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    onChange(editor);
  };
  
  return (
    <div className="editor-wrapper">
      <MonacoEditor 
        onChange={onEditorDidMount}
        // value acts as initial value
        value={initialValue}
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;