import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loading from '@/components/Loading';

const SymbolsView = lazy(() => import('@/components/SymbolsView'));
const StatementsView = lazy(() => import('@/components/StatementsView'));
const ProfileView = lazy(() => import('@/components/ProfileView'));

const Router = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route index element={<SymbolsView />} />
      <Route path="profile" element={<ProfileView />} />
      <Route path="statements" element={<StatementsView />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Suspense>
);

export default Router;
