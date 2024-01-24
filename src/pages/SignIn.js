/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../store/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import logo from '../components/assets/Lilac-logo-transparent.png';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChnage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log('formData  ', formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //setIsLoading(true);
      dispatch(signInStart());
      const res = await fetch('http://localhost:3005/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log('res', res);
      const data = await res.json();

      const token = res.headers.get('x-auth-token');
      console.log('token  ', token);
      console.log('data', data);

      if (token) {
        localStorage.setItem('lilac-auth-token', token);
      }

      if (data.error) dispatch(signInFailure());
      //setError(true);

      dispatch(signInSuccess(data));

      navigate('/');
    } catch (error) {
      console.log('error', error);

      dispatch(signInFailure(error));
    }
  };

  const styles = {
    inputbox:
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ',
    lable: 'block mb-2 text-sm font-medium text-gray-900 ',
    checkbox: ' text-sm font-medium text-gray-900 mr-2',
    button:
      ' px-5 py-4 rounded-lg w-full text-white hover:text-gray-800 bg-gray-800 hover:bg-gray-900 hover:border-gray-800 hover:border-2 border-2 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-gray-200',
  };

  return (
    <>
      <div className="container mx-auto px-4 w-5/12 h-screen flex flex-col justify-center items-center">
        <img
          src={logo}
          className="object-cover rounded-lg w-56"
          alt="Sing in form image"
        />

        <div className="w-full">
          <div className="my-7 flex flex-row justify-start items-center">
            <h2 className="text-3xl font-semibold"> Sign In </h2>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label for="email" className={styles.lable}>
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.inputbox}
                  placeholder="name@flowbite.com"
                  onChange={handleChnage}
                  required
                />
              </div>
              <div className="mb-5">
                <label for="password" className={styles.lable}>
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className={styles.inputbox}
                  onChange={handleChnage}
                  required
                />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className={styles.checkbox}
                    required
                  />
                </div>
                <label for="remember" className={styles.lable}>
                  Remember me
                </label>
              </div>

              <button
                disabled={loading}
                type="submit"
                className={styles.button}
              >
                {loading ? 'loading...' : 'Sign up'}
              </button>
            </form>
          </div>

          <div className="flex justify-center items-center mb-5">
            <p className="inline-flex gap-2  mb-2 text-md font-medium text-gray-900">
              Have an account already?{' '}
              <span>
                <Link to={'/sign-up'} className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </span>
            </p>
          </div>
          <OAuth />

          {error ? <p>Something went Wrong!</p> : ''}
        </div>
      </div>
    </>
  );
};

export default SignIn;
