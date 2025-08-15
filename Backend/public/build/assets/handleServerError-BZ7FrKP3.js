import{j as s}from"./react-ZtzTtHoT.js";import{n as p}from"./notify-FDE75iTz.js";function g(){return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`

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

                    `}),s.jsx("div",{className:"spinner-wrapper",children:s.jsx("div",{className:"spinner"})})]})}function f(e,n){var r,i;let d=(r=e==null?void 0:e.data)==null?void 0:r.message,a="";const t=e==null?void 0:e.status;switch(t){case 400:a="Bad Request";break;case 401:a="Unauthenticated";break;case 403:a="Forbidden";break;case 404:a="Resource Not Found";break;case 422:a="Unprocessable Entity";break;case 500:a="Server Error";break;case 503:a="Service Unavailable";break;default:a="Something went wrong. Try Again";break}p(d||a),(t==401||t==422)&&n&&((i=e==null?void 0:e.data)!=null&&i.errors)&&Object.entries(e.data.errors).forEach(o=>{var c;n(o[0],{type:"manual",message:(c=o[1])==null?void 0:c[0]})})}export{g as L,f as h};
