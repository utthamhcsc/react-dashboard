import React, { useState } from 'react';

export default function useToggle(initial = false) {
  const [toggle, setToggle] = useState(initial);
  return [toggle, () => setToggle((v) => !v)];
}
