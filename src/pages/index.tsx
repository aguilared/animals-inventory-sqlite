import type { NextPage } from "next";
import Image from "next/image";
import Container from "../components/Container";

const Home: NextPage = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Image
          src="/static/images/gonzaleraRanch1.jpg"
          alt="my desk"
          width={1920 / 4}
          height={1280 / 4}
        />
        <Image
          src="/static/images/gonzaleraRanch.jpg"
          alt="my desk"
          width={1920 / 4}
          height={1280 / 4}
        />
      </div>
      <div className="lg:text-center py-2 bg-white mt-2">
        <p className="mt-2 text-blue-800 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
          Welcome to Animals Inventory
        </p>
        <p className="mt-2 text-blue-600 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
          Gonzalera Ranch
        </p>
      </div>
    </Container>
  );
};

export default Home;
