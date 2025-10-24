import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { initialItems } from '@/lib/data/dummy';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';

const Interview = () => {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems);
  const selectedItem = useMemo(
    () => items.find((item) => item.id === count),
    [items, count]
  );

  return (
    <Layout title="Interview Practice">
      <div>
        <h1>Count: {count}</h1>
        <h1>Selected Item: {selectedItem?.id}</h1>
        <Button onClick={() => setCount((prev) => prev + 1)}>Increament</Button>
      </div>
    </Layout>
  );
};

export default Interview;
