import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();

  async function populateQuote() {
    const req = await fetch("http://localhost:3000/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    console.log(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);

      if (!user) {
        localStorage.removeItem("token");
        push("/login");
      } else {
        populateQuote();
      }
    }
  }, [push]);

  return <h1>Welcome to the Dashboard!</h1>;
}
