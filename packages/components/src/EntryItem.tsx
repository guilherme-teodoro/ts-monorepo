import React from 'react';
import { Entry } from '@nighttrax/codecs';
import { format } from 'date-fns';

export const EntryItem: React.FC<{ entry: Entry }> = ({ entry }) => (
  <div className="flex w-full">
    <div className="flex-auto">
      <div className="text-lg">{entry.description}</div>
      <div className="text-gray-500">
        {format(entry.date, 'dd/MM/yyyy hh:mm')}
      </div>
    </div>
    <div className="flex-none text-lg">
      {entry.type === 'debit' && '-'}
      {entry.amount.format()}
    </div>
  </div>
);
