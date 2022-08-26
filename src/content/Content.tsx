import React, { ReactElement } from 'react';



const Content = (): ReactElement => {

  console.log('msg', 'Hello form Content JS');

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 999,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgb(0 0 0 / 30%)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>Content Example</div>
    </div>
  );
};

export default Content;
