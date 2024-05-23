/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useRef, useEffect } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useLoaderData,
} from "react-router-dom";
import Styles from "./form.module.css";
import { loginUser } from "./api";
import ResultModal from "./Modal";

// using loader to pass the message down

export const loginLoader = ({ request }) => {
  //   console.log(request.url)
  return new URL(request.url).searchParams.get("message");
};

// choosing the action function does not matter.
// the action function will intercept the request made when submitting the form

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const phone = formData.get("phone");
  console.log(name);
  console.log(phone);
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  try {
    const data = await loginUser({ name, phone });
    localStorage.setItem("loggedin", true);
    console.log(localStorage.getItem("loggedin"));
    console.log(data.error);
    console.log(pathname);
    const response = redirect(pathname);
    response.body = true;
    return response;
  } catch (err) {
    return err.message;
  }
  // It's silly, but it works
};

const LoginPage = () => {
  // useRef
  const dialog = useRef();

  // code for logging status with useNavigation hook

  const navigation = useNavigation();
  const loginMssgError = useLoaderData();
  const errorMessage = useActionData();
  console.log(errorMessage);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        dialog.current.showModal();
      }, 2000);
    }
  }, [errorMessage]);

  // modal close
  function handleCloseModal() {
    dialog.current.close();
  }

  function handleProgressModal() {
    dialog.current.close();
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        onCancel={handleCloseModal}
        onConfirm={handleProgressModal}
        errorMessage={errorMessage}
      />

      <div className={Styles.login_container}>
        {/* below instead of using the form we wil use Form from the react router */}
        <Form className={Styles.form} method="post" replace>
          <div className="row">
            <p className="errorlgnmsg">{loginMssgError && loginMssgError}</p>
          </div>
          <div className="row input-field">
            {/* <label htmlFor="name">Name</label> */}
            <input type="text" name="name" id="name" placeholder="Name" />
          </div>
          <div className="row input-field">
            {/* <label htmlFor="phone_number">Phone</label> */}
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone Number"
            />
          </div>
          <div className="row input-field">
            <button
              className={Styles.button}
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting" ? "registering..." : "submit"}
            </button>
          </div>

          {/* </form> */}
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
