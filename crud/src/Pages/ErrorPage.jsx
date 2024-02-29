import Lottie from "react-lottie";

import errorAnimaiton from "../assets/error-animation.json";

function ErrorPage() {
  const defaultOptions = {
    loop: true,
    animationData: errorAnimaiton,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div className="Loader">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </>
  );
}

export default ErrorPage;
