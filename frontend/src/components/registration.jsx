/* eslint-disable react-refresh/only-export-components */

import {  Form, redirect, useActionData, useNavigation, useLoaderData } from "react-router-dom";
import Styles from "./form.module.css"


// using loader to pass the message down

export const loginLoader = ({request}) => {
//   console.log(request.url)
return new URL(request.url).searchParams.get("message")

}

// choosing the action function does not matter.
// the action function will intercept the request made when submitting the form

export const loginAction = async({request}) =>{
    console.log("hello")
    const formData = await request.formData();
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
    try {
        const data = await loginUser({email, password})
        localStorage.setItem("loggedin", true);
        console.log(localStorage.getItem("loggedin"));
        console.log(data)
        console.log(pathname)
        const response = redirect(pathname)
        response.body = true
        return response
    }catch(err){
      return err.message
    }
   // It's silly, but it works
}

const LoginPage = () =>{

// code for logging status with useNavigation hook
// give us the status
const navigation  = useNavigation();
console.log(navigation);

    // use of useLoaderData instead of useSearchParams

    const loginMssgError = useLoaderData();
    const errorMessage = useActionData();
    //  console.log(errors)
    return(
        <>
        <div className={Styles.login_container}>
            {/* below instead of using the form we wil use Form from the react router */}
            <Form className={Styles.form} method="post" replace>
            {/* <form action="" className="col"> */}
                <div className="row">
                    <p className="errorlgnmsg">
                      {/* {loginMssgError === null ? "" : loginMssgError} */}
                      {loginMssgError &&  loginMssgError}
                       {/* {errors === null ? "" : errors.message} */}
                       {errorMessage && errorMessage}
                    </p>
                </div>
                    <div className="row input-field">
                        {/* <label htmlFor="name">Name</label> */}
                        <input type="text"  name="name" id="name" placeholder="Name"
                         />
                    </div>
                    <div className="row input-field">
                        {/* <label htmlFor="phone_number">Phone</label> */}
                        <input type="tel"  name="phone_number" id="phone_number" placeholder="Phone Number"/>
                    </div>
                    <div className="row input-field">
                        <button className={Styles.button} disabled={navigation.state === "submitting"}>
                        {navigation.state === "submitting" ? "registering" : "submit"}
                        </button>
                    </div>

            {/* </form> */}
            </Form>
        </div>
        </>
    )
}

export default LoginPage;