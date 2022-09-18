import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdBaner } from "./components/CreateAdBanner";

import { GameBanner } from "./components/GameBanner";

import "./styles/main.css";
import logoImg from "./assets/logoNWLeSports.svg";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
        setGames(response.data);
      });
  }, []);
  return (
    <div className="max-w-[1344px]  mx-auto flex flex-col items-center my-20">
      <img className="w-80" src={logoImg} alt="" />
      <h1 className="text-5xl text-white font-black mt-20 ">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-24">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerURL={game.bannerUrl}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBaner />
        <CreateAdModal/>
        
      </Dialog.Root>
    </div>
  );
}

export default App;
