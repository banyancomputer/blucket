export {}
// // import { auth } from '@/lib/firebase';
// import { FormEvent, useEffect, useState } from 'react';
// import Link from 'next/link';
// import { NextPageWithLayout } from '@/pages/page';
// import PublicLayout from '@/layouts/public/PublicLayout';
// import PublicRoute from '@/components/utils/routes/Public';

// const Login: NextPageWithLayout = ({}) => {
//   const [values, setValues] = useState({ email: '' });
//   const [emailValid, setEmailValid] = useState(true);
//   const [error, setError] = useState('');
//   const [recover, setRecover] = useState(false);

//   const [buttonDisabled, setButtonDisabled] = useState(
//     values.email.length === 0 || !emailValid || recover
//   );
//   const handleValueChange = (e: any) => {
//     const id = e.target.id;
//     const newValue = e.target.value;
//     setValues({ ...values, [id]: newValue });

//     // Check if email is valid
//     if (id === 'email') {
//       handleCheckEmail(e);
//     }
//   };

//   const handleCheckEmail = (event: FormEvent<HTMLInputElement>) => {
//     const { value } = event.target as HTMLInputElement;
//     // TODO: Better email validation
//     setEmailValid(value.length > 0);
//   };

//   const handleRecover = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     auth
//       .sendPasswordResetEmail(values.email)
//       .then(() => {
//         setRecover(true);
//       })
//       .catch((error) => {
//         setError(error.message);
//       });
//   };

//   useEffect(() => {
//     setButtonDisabled(values.email.length === 0 || !emailValid || recover);
//   }, [values, emailValid, recover]);

//   return (
//     <div>
//       {/*<PublicRoute>*/}
//       <div className="text-6xl font-semibold align-left mb-2">Recover</div>
//       <div className="text-xs font-normal align-left mb-6">
//         Reset your password.
//         <div className="text-blue-500">What's your email?</div>
//       </div>
//       <form onSubmit={handleRecover}>
//         <div className="relative">
//           <input
//             id="email"
//             type="text"
//             placeholder="E-mail"
//             className={`input border-[#E9E9EA] border-2 rounded-sm focus:outline-none w-full px-3 mb-3`}
//             onInput={handleValueChange}
//           />
//         </div>
//         {error && (
//           // Error when login fails
//           <label htmlFor="registration" className="label">
//             <span className="text-xxs !p-0 text-error text-left">
//               There was an issue recovering your account. Please try again.
//               Error: {error}
//             </span>
//           </label>
//         )}
//         <div className="flex items-center mt-4">
//           <button
//             className="!h-[52px] flex-1 text-[#00143173] rounded-sm bg-[#CED6DE] text-"
//             disabled={buttonDisabled}
//             type="submit"
//           >
//             {recover ? 'Email Sent' : 'Recover'}
//           </button>
//         </div>

//         {recover && (
//           <div className="text-xs font-normal align-left mt-6">
//             <div className="text-blue-500">
//               Check your email for a link to reset your password.
//             </div>
//             <div className="text-blue-500">
//               <Link href={'/login'}>Back to Login</Link>
//             </div>
//           </div>
//         )}
//       </form>

//       {/*<div className="text-2xl font-medium align-left">Recover</div>*/}

//       {/*<form*/}
//       {/*  onSubmit={handleRecover}*/}
//       {/*  className="w-full p-6 rounded bg-base-content text-base-100"*/}
//       {/*>*/}
//       {/*  /!*<h2 className="mb-2 text-sm font-semibold">Email</h2>*!/*/}
//       {/*  <div className="relative">*/}
//       {/*    <input*/}
//       {/*      id="email"*/}
//       {/*      type="text"*/}
//       {/*      placeholder="me@here.com"*/}
//       {/*      className={`input input-bordered bg-neutral-50 !text-neutral-900 dark:border-neutral-900 rounded-lg focus:outline-none w-full px-3 block ${*/}
//       {/*        emailValid ? '!border-green-300' : '!border-red-400'*/}
//       {/*      }`}*/}
//       {/*      onInput={handleValueChange}*/}
//       {/*    />*/}
//       {/*  </div>*/}

//       {/*  {error && (*/}
//       {/*    // Error when login fails*/}
//       {/*    <label htmlFor="registration" className="label">*/}
//       {/*      <span className="text-xxs !p-0 text-error text-left">*/}

//       {/*      </span>*/}
//       {/*    </label>*/}
//       {/*  )}*/}

//       {/*  <div className="flex items-center mt-4">*/}
//       {/*    <button*/}
//       {/*      className="ml-2 !h-[52px] flex-1 btn btn-primary disabled:opacity-50 disabled:border-neutral-900 disabled:text-neutral-900"*/}
//       {/*      disabled={buttonDisabled}*/}
//       {/*      type="submit"*/}
//       {/*    >*/}
//       {/*      {recover ? 'Email Sent' : 'Recover'}*/}
//       {/*    </button>*/}
//       {/*  </div>*/}
//       {/*</form>*/}

//       {/*/!* Back to Login *!/*/}
//       {/*{recover && (*/}
//       {/*  <div className="text-sm text-center">*/}
//       {/*    <Link href="/login">*/}
//       {/*      <div className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">*/}
//       {/*        Back to Login*/}
//       {/*      </div>*/}
//       {/*    </Link>*/}
//       {/*  </div>*/}
//       {/*)}*/}
//       {/*</PublicRoute>*/}
//     </div>
//   );
// };

// export default Login;

// Login.getLayout = (page) => {
//   return <PublicLayout>{page}</PublicLayout>;
// };
