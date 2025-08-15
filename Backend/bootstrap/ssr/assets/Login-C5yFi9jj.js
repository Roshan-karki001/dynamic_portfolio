import{jsxs as o,Fragment as b,jsx as e}from"react/jsx-runtime";import{useState as x,useEffect as w}from"react";import{useDispatch as y}from"react-redux";import{e as N,R as v,s as S}from"../ssr.js";import{useForm as E}from"react-hook-form";import{a as k}from"./notify-CE4wPZpe.js";import"@inertiajs/react";import"@inertiajs/react/server";import"react-dom/server";import"react-dom/client";import"@mantine/core";import"@mantine/notifications";import"@reduxjs/toolkit";import"redux-persist";import"@reduxjs/toolkit/query/react";import"@reduxjs/toolkit/query";import"redux-persist/lib/storage/index.js";/* empty css                 */function q(){return o(b,{children:[e("style",{children:`

                    .spinner-wrapper{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: transparent;
                    }

                    .spinner {
                        width: 40px;
                        height: 40px;
                        border: 4px solid rgba(0, 0, 0, 0.1);
                        border-top: 4px solid #3498db;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }

                    `}),e("div",{className:"spinner-wrapper",children:e("div",{className:"spinner"})})]})}const L=N.injectEndpoints({endpoints:t=>({login:t.mutation({query:s=>({url:"login",method:"POST",body:s}),invalidatesTags:[v.GET_LOGIN]})})}),{useLoginMutation:j}=L;function T(t,s){var a,m;let c=(a=t==null?void 0:t.data)==null?void 0:a.message,r="";const n=t==null?void 0:t.status;switch(n){case 400:r="Bad Request";break;case 401:r="Unauthenticated";break;case 403:r="Forbidden";break;case 404:r="Resource Not Found";break;case 422:r="Unprocessable Entity";break;case 500:r="Server Error";break;case 503:r="Service Unavailable";break;default:r="Something went wrong. Try Again";break}k(c||r),(n==401||n==422)&&s&&((m=t==null?void 0:t.data)!=null&&m.errors)&&Object.entries(t.data.errors).forEach(l=>{var i;s(l[0],{type:"manual",message:(i=l[1])==null?void 0:i[0]})})}const V=()=>{var u,p;const t=typeof window<"u"?y():null,[s,{isLoading:c}]=j(),[r,n]=x(!1),{register:a,handleSubmit:m,reset:g,setError:l,formState:{errors:i}}=E();w(()=>{n(!0)},[]);const f=async h=>{try{const d=await s(h).unwrap();d&&d.success&&r&&(t&&t(S(d)),window.location.href="/admin/dashboard")}catch(d){T(d,l)}};return c?e(q,{}):e("div",{className:"min-h-screen",children:e("div",{className:"flex flex-col md:flex-row justify-center items-center m-6 p-6",children:o("div",{className:"w-full h-full md:w-1/2 rounded-lg shadow-lg px-6 py-12 border border-gray-300 hover:shadow-xl transition-shadow duration-300",children:[e("h2",{className:"text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center",children:"Login"}),o("form",{onSubmit:m(f),method:"POST",className:"space-y-6",children:[o("div",{children:[e("label",{className:"block text-sm md:text-base font-medium text-gray-700 mb-2 md:mb-3 required-field",htmlFor:"email",children:"Email"}),e("input",{className:"w-full p-3 md:p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out",id:"email",...a("email",{required:"Email is required"}),placeholder:"example@domain.com"}),((u=i.email)==null?void 0:u.message)&&e("p",{className:"text-red-500 text-sm mt-1",children:i.email.message})]}),o("div",{children:[e("label",{className:"block text-sm md:text-base font-medium text-gray-700 mb-2 md:mb-3 required-field",htmlFor:"password",children:"Password"}),e("input",{className:"w-full p-3 md:p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out",id:"password",type:"password",...a("password",{required:"Password is required"}),placeholder:"••••••••"}),((p=i.password)==null?void 0:p.message)&&e("p",{className:"text-red-500 text-sm mt-1",children:i.password.message})]}),e("div",{className:"flex flex-col md:flex-row items-center justify-between",children:o("div",{className:"flex items-center mb-4 md:mb-0",children:[e("input",{id:"remember-me",type:"checkbox",...a("remember"),className:"h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"}),e("label",{htmlFor:"remember-me",className:"ml-2 text-sm md:text-base text-gray-900",children:"Remember me"})]})}),e("div",{children:e("button",{className:"w-full py-3 px-4 md:py-4 md:px-6 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out",type:"submit",children:"Sign In"})})]})]})})})};export{V as default};
