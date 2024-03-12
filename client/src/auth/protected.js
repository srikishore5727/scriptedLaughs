import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

const ProtectedRouter = ({ element, ...rest }) => {
  const RenderComponent = element;
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        {...rest}
        element={
          true ? <RenderComponent {...rest} /> : navigate('/login')
        }
      />
    </Routes>
  );
};

export default ProtectedRouter;
