import { Footer, Header, Card } from "./components"

const countries = [
  {
    id: 1,
    country: "Brazil",
    capital: "Brasília",
    region: "South America",
    population: 214000000
  },
  {
    id: 2,
    country: "Japan",
    capital: "Tokyo",
    region: "Asia",
    population: 125800000
  },
  {
    id: 3,
    country: "United States",
    capital: "Washington, D.C.",
    region: "North America",
    population: 331000000
  },
  {
    id: 4,
    country: "Germany",
    capital: "Berlin",
    region: "Europe",
    population: 83200000
  },
  {
    id: 5,
    country: "India",
    capital: "New Delhi",
    region: "Asia",
    population: 1408000000
  },
  {
    id: 6,
    country: "France",
    capital: "Paris",
    region: "Europe",
    population: 67000000
  },
  {
    id: 7,
    country: "Australia",
    capital: "Canberra",
    region: "Oceania",
    population: 26000000
  }
];

console.log(countries);


export default function Home() {
  return (
    <>
      <Header></Header>
      <main className="flex-1">
        {countries.map((country) => (
          <Card
            key={country.id}
            id={country.id}
            country={country.country}
            capital={country.capital}
            region={country.region}
            population={country.population}
          />
        ))}
      </main>

      <Footer></Footer>
    </>
  )
}
