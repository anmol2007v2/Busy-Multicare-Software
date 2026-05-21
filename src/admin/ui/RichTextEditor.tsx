import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Heading2, Undo, Redo } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '../../lib/utils';
import { ADMIN_BRAND } from '../theme';

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  className?: string;
};

export default function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[200px] px-4 py-3 focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const ToolBtn = ({ onClick, active, children, label }: { onClick: () => void; active?: boolean; children: React.ReactNode; label: string }) => (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={cn(
        'p-2 rounded-md text-slate-600 hover:bg-slate-100 transition',
        active && 'bg-slate-200 text-slate-900'
      )}
    >
      {children}
    </button>
  );

  return (
    <div className={cn('border border-slate-200 rounded-xl overflow-hidden bg-white', className)}>
      <div className="flex flex-wrap gap-0.5 p-2 border-b border-slate-200 bg-slate-50">
        <ToolBtn label="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <Bold size={16} />
        </ToolBtn>
        <ToolBtn label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <Italic size={16} />
        </ToolBtn>
        <ToolBtn label="Heading" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          <Heading2 size={16} />
        </ToolBtn>
        <ToolBtn label="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          <List size={16} />
        </ToolBtn>
        <ToolBtn label="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          <ListOrdered size={16} />
        </ToolBtn>
        <ToolBtn label="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={16} />
        </ToolBtn>
        <ToolBtn label="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={16} />
        </ToolBtn>
      </div>
      <EditorContent editor={editor} />
      <style>{`.ProseMirror:focus { outline: 2px solid ${ADMIN_BRAND}33; outline-offset: -2px; }`}</style>
    </div>
  );
}
