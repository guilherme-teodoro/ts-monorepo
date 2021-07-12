import React from 'react';

export const Card: React.FC<{}> = ({ children }) => (
  <div className="shadow-xl -mt-10 bg-white rounded">{children}</div>
);
