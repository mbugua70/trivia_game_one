/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useLoaderData,
} from "react-router-dom";
import Styles from "./form.module.css";
import { loginUser } from "./api";

// using loader to pass the message down

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export const loginLoader = ({ request }) => {
  return new URL(request.url).searchParams.get("message");
};

// choosing the action function does not matter.
// the action function will intercept the request made when submitting the form

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const phone = formData.get("phone");

  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/trivia";
  try {
    const data = await loginUser({ name, phone });
    localStorage.setItem("user", JSON.stringify(data));
    console.log(data.error);

    // const response = redirect(pathname);
    // response.body = true;
    return redirect(pathname);
  } catch (err) {
    if (err) {
      console.log(err.message);

      // const MySwal = withReactContent(Swal);
      // MySwal.fire({
      //   html: <i>{err.message}</i>,
      //   icon: "error",
      // });
    }
    return err.message;
  }
  // It's silly, but it works
};

const LoginPage = () => {
  // code for logging status with useNavigation hook

  const navigation = useNavigation();
  const loginMssgError = useLoaderData();
  // const errorMessage = useActionData();

  // useEffect(() => {
  //   setShowModal(false);
  //   if(errorMessage){
  //     setShowModal((prevValue) => prevValue + 1)
  //     const MySwal = withReactContent(Swal);
  //     MySwal.fire({
  //       html: <i>{errorMessage}</i>,
  //       icon: "error",
  //     });
  //   }
  // }, [showModal])

  return (
    <>
      <div className={Styles.login_container}>
        {/* below instead of using the form we wil use Form from the react router */}
        <Form className={Styles.form} method="post" replace>
          <div className="row">
            <div className="errorlgnmsg">
              {loginMssgError && (
                <div className="alert alert-danger" role="alert">
                  <p>
                    <i className="material-icons">error</i>
                  </p>
                  <p className="error_alert_message">{loginMssgError}</p>
                </div>
              )}
            </div>
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
          <div className="row input-field  button-style">
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
