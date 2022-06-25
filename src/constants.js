export const PROJECTNAME = 'MyBicycles';
export const GOOGLEKEY = 'upload here your api key';

// API METHODS NAME //
//export const BASE_URL = 'http://10.0.2.2/gogreen/public/api/'; //DEMO
export const BASE_URL = 'https://mybicycles.in/api/'; //DEMO

export const ApiMethods = {
   //LOGIN MOODULE
   loginApi: 'user/signin',
   registerApi: 'user/signup',
   forgotPassword: 'user/forgotpassword',
   resetPassword: 'user/reset-password',
   verifyOtp: 'user/verify-otp',
   changePassword: 'user/change-password',
   resendOtp: 'user/resend-otp',

   getUserProfile: 'users/getprofile',
   updateProfile: 'users/profile',
   termsCondition: 'page/term-conditions',
   pageApi: 'page/',
   courseList: 'course-list',
   lockDetail: 'locks/lock-detail',
   getPaytmToken: 'wallet/token',
   userTransaction: 'wallet/transaction',
   getUserBalance: 'wallet/checkbalance',
   startRide: 'ride/startride',
   endRide: 'ride/endride',
   rideHistory: 'ride/history',
   rideDetails: 'ride/detail',
   nearbyStand: 'ride/nearbystand',
   transactionHistory: 'transaction/history',
   masterData: 'masterdata',
   getUserRide: 'ride/getride',
   getDashboardData: 'users/dashboard-data',
   subscriptions: 'subscriptions',
   SelfAtendance: 'staff/self-atendance',
   
   
};

export const appLanguage = {
   THAI: 'hindi',
   ENGLISH: 'english',
};


export const Images = {
   //LOGIN SCREEN
   //appLogo: require('../../assets/slicing/logo.png'),
};

export const STORAGES = {
   USER_INFO: 'userInfo',
   RIDE_INFO: 'rideInfo',
   TOKEN: 'token',
   COURSELANG: 'courseLanguage',
   APPLANGUAGE: 'appLanguage',
   FCMTOKEN: 'fcmToken',
};

export const SHIMMER_EFFECT_TYPE = {
   USER_EFFECT: 'userList',
   PRODUCT_EFFECT: 'productList',
};

export const Messages = {
   server_error: 'Something went wrong, please try again.',
   LocationAssess: 'Open setting for location access permission.',
   verify_phone: 'Verify your registered mobile number',
   otp_fill: 'OTP has been sent to your registered number fill in below',

   no_internet: 'No internet, please check your internet.',
   logout_message: 'Are you sure you want to logout?',
   delete_bike_message: 'Are you sure you wish to delete this ride?',
   openSettingForLocation: 'Please allow location access from your setting.',
   openSetting:
      'Please allow camera or photo library access from your setting.',
   Card_Detail: 'Please enter card details.',
   CameraLibraryAccess:
      'Open setting for camera/photo library access permission.',
   qr_code_prompt:
      'Do you already have a idTAG from an authorized idRIDER retailer?',
   Email: 'Please enter email.',
   ValidEmail: 'Please enter valid email.',
   update_location:
      'With this feature, you can update your latest ride location.',
   selectOption: 'Please select one of the option.',
   selectImage: 'Please select one of the following options.',
   selectCamera: 'idRIDER would like to access the camera.',
   OTP: 'Please enter otp',
   Password: 'Please enter password.',
   SpaceInPassword: 'Password does not allow space.',
   Name: 'Please enter name.',
   Address: 'Please enter address.',
   Mobile: 'Please enter mobile number.',
   City: 'Please enter city.',
   State: 'Please enter state.',
   Country: 'Please enter country.',
   DOB: 'Please Select DOB.',
   Pincode: 'Please enter pincode.',
   InvalidPincode: 'Please enter valid pincode',
   CPassword: 'Please enter confirm password.',
   OldPassword: 'Please enter old password.',
   NewPassword: 'Please enter new password.',
   PasswordLength: 'Password should have at least 6 characters.',
   PasswordNotMatch: 'Confirm password not match with password.',
   TermCondition: 'Please check Terms & Condition.',

   metricType: 'Please select metric type.',
   searchMessage: 'Please enter search keywords.',
   CameraAssess: 'Open setting for camera access permission.',
   StorageAssess: 'Open setting for storage access permission.',

   PhoneNumber: 'Phone number must have 9 to 13 digits.',
   InValidPhoneNumber: 'Invalid Phone number.',
   InValidMobileNumber: 'Invalid Mobile number.',
   InValidLandlineNumber: 'Invalid Landline number.',

   RegisterSuccess: 'You are successfully registered.',
   LoginSuccess: 'You are successfully logged in.',
   PasswordChangeSuccess: 'Password changed successfully.',
   ForgotSuccessMessage:
      'We have sent new password on your email, Please check your email.',
};

export const Paytm = {
   MID: 'zxfZdz46025423964950',
};