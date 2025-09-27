import LogoEPFL from "../assets/logo_epfl.png";
import LogoMIT from "../assets/logo_mit.png";
import LogoETH from "../assets/logo_eth.png";
import LogoMOODLE from "../assets/logo_moodle.png";

function TrustedBy() {
  const logos = [LogoEPFL, LogoETH, LogoMIT, LogoMOODLE];

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <h2 className="text-lg font-lexend text-center mb-6">
        Trusted by our partners
      </h2>
      <ul className="flex flex-row max-w-5xl justify-center items-center gap-8">
        {logos.map((src, idx) => (
          <li
            key={idx}
            className="flex items-center justify-center p-4"
          >
            <img
              src={src}
              alt={`Partner logo ${idx + 1}`}
              className="w-16 h-16 filter grayscale brightness-75 object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrustedBy;