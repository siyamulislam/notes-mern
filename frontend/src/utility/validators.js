 //check email validation
export const isValidEmail = (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


export const isPasswordValid = (password)=>{
     // Minimum length of 6, at least 1 special character, 1 number, and 1 uppercase letter
     const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[A-Z]).{6,}$/;

     return passwordRegex.test(password)
}