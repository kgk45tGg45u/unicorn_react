import { Header } from './components/Header.js'
import { AuthProvider } from './hooks/AuthProvider.js'
import { AllRoutes } from './routes/AllRoutes.js'


function App() {
  return (
    <section>
      <AuthProvider>
        <Header />
        <AllRoutes />
      </AuthProvider>
    </section>
  );
}
export default App;
