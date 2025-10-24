import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ChatProvider } from '@/contexts/ChatContext';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Interview from './pages/Interview';

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="ai-chat-theme">
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
           <Route path="/interview" element={<Interview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  </ThemeProvider>
);

export default App;
