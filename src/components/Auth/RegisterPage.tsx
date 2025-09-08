import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, Building, Calendar, Hash, ArrowRight, Users } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    registrationNumber: '',
    role: '',
    college: '',
    branch: '',
    studentYear: '',
    graduationYear: new Date().getFullYear(),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roles = [
    { value: 'STUDENT', label: 'Student', icon: '🎓' },
    { value: 'FACULTY', label: 'Faculty', icon: '👨‍💻' },
    { value: 'ALUMNI', label: 'Alumni', icon: '👨‍💼' },
  ];

  const studentRoles = [
    { value: 'first-year', label: '1st Year Student', icon: '🌱' },
    { value: 'second-year', label: '2nd Year Student', icon: '📚' },
    { value: 'third-year', label: '3rd Year Student', icon: '💼' },
    { value: 'fourth-year', label: '4th Year Student', icon: '🎓' }
  ];

  const branches = [
    'Computer Science Engineering',
    'Electronics and Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Information Technology',
    'Chemical Engineering',
    'Aerospace Engineering',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Reset conditional fields when role changes
    if (name === 'role') {
      setFormData({
        ...formData,
        [name]: value,
        registrationNumber: '',
        branch: '',
        graduationYear: new Date().getFullYear(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(loginFailure('Passwords do not match'));
      return;
    }

    if (!formData.role) {
      dispatch(loginFailure('Please select your role'));
      return;
    }

    // Validate conditional fields based on role
    if (formData.role === 'student' && !formData.registrationNumber) {
      dispatch(loginFailure('Registration number is required for students'));
      return;
    }

    if (formData.role === 'student' && !formData.studentYear) {
      dispatch(loginFailure('Academic year is required for students'));
      return;
    }

    if ((formData.role === 'student' || formData.role === 'faculty' || formData.role === 'alumni') && !formData.branch) {
      dispatch(loginFailure('Branch is required'));
      return;
    }

    dispatch(loginStart());

    const newUser = {
      id: Date.now().toString(),
      username: `${formData.firstName.toLowerCase()}_${formData.lastName.toLowerCase()}`,
      email: formData.email,
      regNo: formData.registrationNumber,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role as any,
      college: formData.college,
      branchOfStudy: formData.branch,
      graduationYear: formData.graduationYear,
      currentYear: formData.studentYear,
      password: formData.password,
    };
    console.log(newUser);

    const request = await fetch("http://localhost:5000/api/v1/auth/register",
      {
        method: "POST",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newUser)
      }
    );

    const response = await request.json();
    console.log(response);

    if (response.error) {
      dispatch(loginFailure(response.error));
      return;
    }

    // dispatch(loginSuccess(newUser));
    navigate('/login');

  };

  const renderConditionalFields = () => {
    if (!formData.role) return null;

    return (
      <div className="space-y-6 animate-slide-up">
        {/* Student Fields */}
        {formData.role === 'STUDENT' && (
          <>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Academic Year</label>
              <div className="grid grid-cols-2 gap-2">
                {studentRoles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, studentYear: role.value })}
                    className={`p-3 rounded-lg border transition-all duration-200 flex items-center space-x-2 ${formData.studentYear === role.value
                      ? 'bg-orange-500 border-orange-500 text-white shadow-lg scale-105'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500'
                      }`}
                  >
                    <span className="text-lg">{role.icon}</span>
                    <span className="text-sm font-medium">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Registration Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Registration Number</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="20CS001"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Branch</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  required
                >
                  <option value="">Select your branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Expected Graduation Year */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Expected Graduation Year</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  min={new Date().getFullYear()}
                  max={new Date().getFullYear() + 10}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>
          </>
        )}

        {/* Faculty Fields */}
        {formData.role === 'FACULTY' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Branch/Department</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                required
              >
                <option value="">Select your department</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Alumni Fields */}
        {formData.role === 'ALUMNI' && (
          <>
            {/* Branch */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Branch</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  required
                >
                  <option value="">Select your branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Graduation Year */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Graduation Year</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  min={1990}
                  max={new Date().getFullYear()}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>
          </>
        )}

        {/* College/University - Common for all roles */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">College/University</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              placeholder="ABC Institute of Technology"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
              required
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            AS
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join AskSeniors</h1>
          <p className="text-gray-300">Connect with seniors and juniors in your field</p>
        </div>

        {/* Registration Form */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@college.edu"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Role Selection Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Role</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  required
                >
                  <option value="">Select your role</option>
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.icon} {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Conditional Fields */}
            {formData.role && renderConditionalFields()}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 animate-shake">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;