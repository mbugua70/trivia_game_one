import { useRouteError } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

const ErrorHandling = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <div className="errorHandling">
        <div className="row">
          <div className="col s12 m12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <h2>
                  <ErrorIcon />
                </h2>
                <span className="card-title">
                  <h1>{error.message}</h1>
                </span>
                <p>
                  <pre>
                    {error.status} - {error.statusText}
                  </pre>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorHandling;
