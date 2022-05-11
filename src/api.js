import axios from "axios";
import Cookies from "js-cookie";
import {BASE_URL} from './constants';

// const options = {
//     method: 'post',
//     url: '/login',
//     data: {
//       firstName: 'Finn',
//       lastName: 'Williams'
//     }


export const api = async (options, ctx = null) => {
  console.log("options====",options);
  try {
    let token = null;
    if (ctx) {
      token = (await getTokenFromCookie(ctx.req.headers.cookie)) || null;
    } else {
      let cookieToken = Cookies.get("token");
      token = cookieToken ? cookieToken : null;
    }
  
    const res = await axios.post(BASE_URL + options.url, options.data, {headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS' }})
    .then((response) => {
      return response;
      //console.log(response);
    });




   
    return res.data;


  } catch (err) {
    return err;
  } 
};

// export const apiAuth = async (options, ctx) => {
//   try {
//     let token = null;
//     if (ctx) {
//       token = (await getTokenFromCookie(ctx.req.headers.cookie)) || null;
//     } else {
//       let cookieToken = Cookies.get("token");
//       token = cookieToken ? cookieToken : null;
//     }

//     const base_url = process.env.SITE_URL; //"http://localhost:82/jurassicfeastdev/public/api/";
//     const res = await axios({
//       headers: { Authorization: `Bearer ${token}` },
//       url: base_url + options.url,
//       method: options.method,
//       data: options.data,
//     });
//     return res.data;
//   } catch (err) {
//     return err;
//   }
// };
export const getTokenFromCookie = async (cookies) => {
  let data = null;
  if (typeof cookies === "string" && cookies.length > 1) {
    data = parseCookie(cookies);
  }
  return data && data.token ? data.token : null;
};

const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
