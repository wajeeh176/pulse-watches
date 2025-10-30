import { lazy, Suspense } from 'react';

// Lazy load ToastContainer to reduce initial bundle size
const ToastContainer = lazy(() => 
  import('react-toastify').then(module => ({ 
    default: module.ToastContainer 
  }))
);

export default function LazyToastContainer(props) {
  return (
    <Suspense fallback={null}>
      <ToastContainer {...props} />
    </Suspense>
  );
}
