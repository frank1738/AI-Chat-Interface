import CreateComponent from '@/components/test/CreateComponent';
import EditComponent from '@/components/test/EditComponent';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Composition = () => {
  const [formState, setFormState] = useState('create');

  const renderFormState = {
    create: <CreateComponent />,
    edit: <EditComponent />,
  };
  return (
    <div className="p-16">
      <div className="flex gap-6 mb-2 ju">
        <Button
          onClick={() => setFormState('create')}
          className="cursor-pointer"
        >
          Create
        </Button>
        <Button onClick={() => setFormState('edit')} className="cursor-pointer">
          Edit
        </Button>
      </div>
      <div>{renderFormState[formState]}</div>
    </div>
  );
};

export default Composition;

function Composer({
  showToolbar,
  showAttachments,
  showEmoji,
  showFormatting,
  showMentions,
  content,
}) {
  return (
    <div className="composer">
      <textarea>{content.text}</textarea>
      <button>Send</button>
      {showToolbar && <div className="toolbar" />}
      {showAttachments && <button>📎</button>}
      {showEmoji && <button>😊</button>}
      {showFormatting && <button>B</button>}
      {showMentions && <button>@</button>}

      {/* too many props 😱 */}
    </div>
  );
}
