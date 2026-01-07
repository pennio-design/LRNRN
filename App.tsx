import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Layout } from './app/layout.tsx';

// STRATEGIC: Static imports are mandatory to prevent dynamic loading failures in AI Studio.
// Using explicit relative paths with extensions for browser-native ESM compatibility.
import LandingPage from './app/marketing/LandingPage.tsx';
import MetaPage from './app/marketing/MetaPage.tsx';
import QuestionFlowPage from './app/question-flow/page.tsx';
import LearningRoomPage from './app/learn/page.tsx';

/**
 * STRATEGIC: Global Routing
 * Using HashRouter for environment compatibility.
 * All route components are imported statically using relative paths.
 */
export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/meta" element={<MetaPage />} />
          <Route path="/question-flow" element={<QuestionFlowPage />} />
          <Route path="/learn/:nodeId" element={<LearningRoomPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}