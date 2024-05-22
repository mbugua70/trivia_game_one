import { useRouteError } from "react-router-dom";

const ErrorHandling = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <h1>{error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>
    </>
  );
};

export default ErrorHandling;
