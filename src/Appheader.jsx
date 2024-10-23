import { FaSun, FaMoon } from "react-icons/fa6";
import { useTheme } from "./Contexts/ThemeContext";

const Appheader = () => {
  const { theme, toggleTheme } = useTheme();
  const logoLink =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Crystal_128_penguin.png/96px-Crystal_128_penguin.png";
  return (
    <div className="flex justify-around items-center dark:border-white border-b-2 border-black h-1/6">
      <div className="logo">
        <img src={logoLink} alt="logo" className="w-full" />
      </div>
      <div className="menu">
        <ul className="flex items-center gap-8">
          <li>Home</li>
          <li>Options</li>
        </ul>
      </div>
      <div className="text-3xl theme">
        <button
          onClick={() => {
            toggleTheme();
          }}
        >
          {theme == "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default Appheader;
