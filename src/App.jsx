import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Signin from './Signin';
import Dashboard from './Dashboard';
import Paymentjollofricedashboard from './Paymentjollofricedashboard';
import SettingsPage from './SettingsPage';
import ProfilePage from './ProfilePage';

function App() {
	return (
		<>
			<Routes>
  <Route path="/" element={<Register />} />
  <Route path="/signin" element={<Signin />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/paymentjollofricedashboard" element={<Paymentjollofricedashboard />} />
	<Route path="/settings" element={<SettingsPage />} />
	<Route path="/profile" element={<ProfilePage />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
			
		</>
	);
}

export default App;
