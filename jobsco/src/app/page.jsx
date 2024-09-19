import { currentUser } from "@clerk/nextjs/server";

async function Home() {
  const user = await currentUser();
  
  return <>
  </>;
}

export default Home;
