'use client';

import { useEffect, useState } from "react";
import { Footer, Header, Card, Grid } from "./components";
import { apiCountries } from "./services";

type Country = {
  cca3: string;
  flags: {
    svg: string;
  };
  name: { common: string };
  capital?: string[];
  region: string;
  population: number;
};

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCountries = async () => {
      const [response, error] = await apiCountries.getAll()
      setLoading(false)
      if(error){
        setError(error)
        console.log(error)
      }
      setCountries(response)
    }
      fetchCountries();
}, []);

  if(loading) return <div>Loading...</div>;
  if(error) return <div>{error}</div>

  return (
    <>
      <Header />
      <main className="flex-1">
        <Grid>
          {countries.map(({cca3, flags, name, capital, region, population}, index) => {
            const {svg: flag} = flags ?? {};
            const {common: countryName} = name ?? {};
            const [capitalName] = capital ?? [];
          return(
            <Card
              index={index}
              key={cca3}
              flag={flag}
              name={countryName}
              capital={capitalName}
              region={region}
              population={population}
            />
          )}
        )}
        </Grid>
      </main>
      <Footer />
    </>
  );
}