import { Link } from "react-router-dom";

function HookBody() {
  return (
    <div className="flex flex-col items-center text-center justify-center py-40">
      <h1 className="text-7xl font-semibold font-lexend">
        <span className="text-blue-600">Decentralized</span> platform <br></br>
        for <span className="text-blue-600">efficient</span> exam correction
      </h1>
      <h2 className="text-xl font-light py-10 font-lexend">
        Ensure fair results with fully anonymous submissions, unbiased grading,<br></br>and a seamless correction process.
        Well suited for Universities and schools. <br></br>
      </h2>
      <Link to="/" className="px-6 py-4 text-2xl font-lexend rounded-full bg-black text-white hover:bg-blue-950">
        Get Started now
      </Link>
    </div>
  );
}

export default HookBody;
