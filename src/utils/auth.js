
import { sign, verify } from "jsonwebtoken";

const generateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.AccessTokenSecretKey, {
    expiresIn: "180s",
  });
  return token;
};

const verifyAccessToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.AccessTokenSecretKey);
    return tokenPayload;
  } catch (err) {
    console.log("Verify Access Token Error ->", err);
    return false;
  }
};
const valiadtePhone = (phone) => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return pattern.test(phone);
};
const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.RefreshTokenSecretKey, {
    expiresIn: "15d",
  });
  return token;
};


const valiadteMeliCode = (meliCode) => {
  var xv= meliCode;
  if (isNaN(xv)) {
    swal({
      title: "کد ملی نادرست است",
      icon: "error",
      buttons: "تلاش مجدد",
    });
  } else if (xv == "") {
    swal({
      title: "کد ملی نادرست است",
      icon: "error",
      buttons: "تلاش مجدد",
    });
  } else if (xv.length < 10) {
    swal({
      title: "کد ملی نادرست است",
      icon: "error",
      buttons: "تلاش مجدد",
    });
  } else {
      var yy = 0;
      var yv = parseInt(yv);
      for (let i = 0; i < xv.length; i++) {
          yv = xv[i] * (xv.length - i);
          yy += yv;
      }
      var x = yy % 11;
      if (x === 0) {
          //alert("your code is valid !");
          return true;
      } else {
        swal({
          title: "کد ملی نادرست است",
          icon: "error",
          buttons: "تلاش مجدد",
        });
          return false;
      }
      yy = 0;
  }

};


export {
  
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  valiadteMeliCode,
  valiadtePhone
  
};
