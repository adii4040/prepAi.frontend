import './App.css'
import { Routes, Route } from 'react-router-dom'
import PublicRoute from './routes/PublicRoutes'
import PrivateRoute from './routes/PrivateRoutes'
import {
  LoginPage,
  SignupPage,
  DashboardPage,
  AnalysisPage,
  ReportPage
} from './pages'

import { AppLayout } from './layout/appLayout'

function App() {

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          }
        />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route
          path="/analyze"
          element={
            <AppLayout>
              <AnalysisPage />
            </AppLayout>
          }
        />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route
          path="/report/:analysisId"
          element={
            <AppLayout>
              <ReportPage />
            </AppLayout>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
