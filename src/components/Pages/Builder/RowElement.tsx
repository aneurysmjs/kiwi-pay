import { FunctionComponent, ReactNode } from 'react';

import { withDrag, WithDragProps } from '~/shared/hooks/withDrag/withDrag';

interface PropsType extends WithDragProps {
  id: string;
  children?: ReactNode;
}

const RowElementComponent: FunctionComponent<PropsType> = ({ children }) => {
  return (
    <div className="card ms-3">
      <div className="card-body">{children}</div>
    </div>
  );
};

// eslint-disable-next-line import/prefer-default-export
export const RowElement = withDrag(RowElementComponent);
