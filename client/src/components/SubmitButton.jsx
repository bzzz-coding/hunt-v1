import { useNavigation } from "react-router-dom";

const SubmitButton = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "isSubmitting";

  return (
    <button
      type="submit"
      className={`btn btn-block form-btn ${formBtn && "form-btn"}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "submitting" : "submit"}
    </button>
  );
};
export default SubmitButton;
