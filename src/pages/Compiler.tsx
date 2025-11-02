import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ChildComponent from '@/components/test/ChildComponent';

const Compiler = () => {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState('frank');
  console.log('Render Home Page');
  return (
    <div className="p-16">
      <h1>{number}</h1>
      <ChildComponent name={name} />
      <Button onClick={() => setNumber((prev) => prev + 1)}>+</Button>
      <Button
        onClick={() =>
          setName((prev) => (prev === 'frank' ? 'osoro' : 'frank'))
        }
      >
        Name
      </Button>
    </div>
  );
};

export default Compiler;
