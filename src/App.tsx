import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { store } from './store/store';
import { useAppSelector } from './hooks';
import Layout from './components/Layout/Layout';
import AppRoutes from './components/Routes/AppRoutes';

const AppContent: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isAuthenticated ? (
        <Layout>
          <AppRoutes />
        </Layout>
      ) : (
        <AppRoutes />
      )}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;