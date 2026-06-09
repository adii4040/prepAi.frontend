import './App.css'
import { Routes, Route } from 'react-router-dom'
import PublicRoute from './routes/PublicRoutes'
import PrivateRoute from './routes/PrivateRoutes'
import {
  LoginPage,
  SignupPage,
  DashboardPage,
  AnalysisPage,
  ReportPage,
  LandingPage
} from './pages'

import { AppLayout } from './layout'

function App() {

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route
          path="/"
          element={<LandingPage />}
        />
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
          path="/"
          element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          }
        />
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
