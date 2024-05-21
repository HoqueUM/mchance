import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import BackgroundTriangles from '../components/lowpoly.jsx';
import FindOut from '../components/ui/FindOut';
import Questions from '../components/Questions';

export default function Home() {
  return (
    <main>
    <div className="low-poly">
      <BackgroundTriangles />
      <div className="overlay-text">
        <h1>MChance</h1>
        <p>What are your odds?</p>
        <FindOut />
      </div>
    </div>
    <div id='questions' className="h-screen flex justify-center items-center bg-[#00274C]">
      <Questions />
    </div>
    </main>
  );
}