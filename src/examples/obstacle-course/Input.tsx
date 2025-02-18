import { useState } from 'react';

type Props = {};

const Input = (props: Props) => {
  const [text, setText] = useState<string>('');

  return (
    <div>
      <input
        type="text"
        placeholder="Some text…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-testid="color-input"
      />
    </div>
  );
};

export default Input;
