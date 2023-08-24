import { useRouteError } from "react-router-dom"

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <h4>Error caught!</h4>
  )
}
export default Error