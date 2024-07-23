import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n';
import Router from './routes';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen font-mono App">
        <Router />
      </div>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
