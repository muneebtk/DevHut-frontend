import React,{Fragment} from 'react';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import OtpVerificationPage from './Pages/OtpVerificationPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import ResetPasswordPage from './Pages/ResetPasswordPage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
import HomePage from './Pages/HomePage';
import {AuthProvider} from './Context/AuthContext';
import { AppProvider } from './Context/AppContext';
import WritePage from './Pages/WritePage';
import SingleBlogView from './Pages/SingleBlogView';
import AuthorProfilePage from './Pages/AuthorProfilePage';
import CategoryPage from './Pages/CategoryPage';
import EditAuthorProfilePage from './Pages/EditAuthorProfilePage';
import CompilerPage from './Pages/CompilerPage';
import SearchResultPage from './Pages/SearchResultPage';
import UsersPage from './Pages/UsersPage';
import AdminBlogsListPage from './Pages/AdminBlogsListPage';
import EditBlogPage from './Pages/EditBlogPage';
import StaffsPage from './Pages/StaffsPage';
import AdminHomePage from './Pages/AdminHomePage';
import AdminCommentsPage from './Pages/AdminCommentsPage';
import NofFoundPage from './Pages/NofFoundPage';
import PrivateRoute from './Utils/PrivateRoute';
import AuthorPrivateRoute from './Utils/AuthorPrivateRoute';

function App() {
  return (
    <div>
        <Router>
        <AuthProvider>
          <AppProvider>
            <Routes>
             
                <Route element={<HomePage/> } path='/'/>
                <Route element={<LoginPage/>} path='/user/login' />
                <Route element={<SignupPage/>} path='/user/signup' />
                <Route element={<OtpVerificationPage/>} path='/user/otp_verification' />
                <Route element={<ForgotPasswordPage/>} path='/user/forgot_password' />
                <Route element={<ResetPasswordPage/>} path='/user/reset_password/:mg/:token'/>
                <Route element={<WritePage/>} path='/write' />
                <Route element={<SingleBlogView/> } path='/blog_view/:id'/>
                <Route element={<AuthorProfilePage/>} path='/author/profile/:id'/>
                <Route element={<CategoryPage/>} path='/blogs/:slug/' />
                <Route element={<CompilerPage/>} path='/python-compiler'/>
                <Route element={<SearchResultPage/>} path='/search/:slug'/>
                <Route element={<NofFoundPage/>} path='*' /> 
                {/* Author route */}
                <Route element={<AuthorPrivateRoute/>} path='/'>
                  <Route element={<EditAuthorProfilePage/>} path='/author/profile/edit/:id'/>
                  <Route element={<EditBlogPage/>} path='blogs/edit_blog/:id/' />
                </Route>

                {/* admin panel routes */}
                <Route element={<PrivateRoute/> }path='/'>
                  <Route element={<UsersPage/>} path='admin_panel/users_list/' />
                  <Route element={<AdminBlogsListPage/> }path='admin_panel/blogs_list/'/>
                  <Route element={<StaffsPage/>} path='admin_panel/staffs/' />
                  <Route element={<AdminHomePage/>} path='admin_panel/home/' />
                  <Route element={<AdminCommentsPage/>} path='admin_panel/blog_comments/' />
                </Route>
            </Routes> 
            </AppProvider>
          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
