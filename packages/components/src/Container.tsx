import React from 'react';

export const Container: React.FC<{}> = ({ children }) => (
  <div className="max-w-2xl w-full mx-auto">{children}</div>
);
