import { Header } from './components/Header.js'
import { AuthProvider } from './hooks/AuthProvider.js'
import { AllRoutes } from './routes/AllRoutes.js'
import { UserWizardProvider } from './hooks/UserWizardProvider'


function App() {
  return (
    <section>
      <AuthProvider>
        <UserWizardProvider>
          <Header />
          <AllRoutes />
        </UserWizardProvider>
      </AuthProvider>
    </section>
  );
}
export default App;
