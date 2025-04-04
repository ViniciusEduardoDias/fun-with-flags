'use client';

import { useEffect, useState } from "react";
import { Card, Grid, Search, Select, ErrorMessage, Loading } from "./components";
import { apiCountries } from "./services";
import Link from "next/link";

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
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState("All")

  useEffect(() => {
    const fetchCountries = async () => {
      const [response, error] = await apiCountries.getAll()
      setLoading(false)
      if(error){
        setError(error)
        console.log(error)
        return
      }
      setCountries(response)
    }
      fetchCountries();
}, []);

  if(loading) return <Loading text="Discovering countries..." />
  if(error) return <ErrorMessage text={error}/>

  const regions = ["All", ...new Set(countries.map(({ region }) => region))]

  const sortedCountries = (countries ?? []).sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "en-US")
  );

  const filteredCountries = sortedCountries.filter(({name, region}) => {
    const nameMatches = name.common.toLowerCase().includes(search.toLowerCase())
    const regionMatches = selected === "All" || selected === region

    return nameMatches && regionMatches
  });
  return (
    <>
      <div className="flex flex-col-reverse gap-4 md:flex-row justify-between mb-8">
        <Search 
          count={filteredCountries.length}
          search={search}
          setSearch={setSearch}
        />
        <Select 
          options={regions}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <Grid>
        {filteredCountries.map(({cca3, flags, name, capital, region, population}, index) => {
          const {svg: flag} = flags ?? {};
          const {common: countryName} = name ?? {};
          const [capitalName] = capital ?? [];
        return(
          <div key={cca3}>
            <Link href={`/country/${cca3}`}>
              <Card
                index={index}
                flag={flag}
                name={countryName}
                capital={capitalName}
                region={region}
                population={population}
              />
            </Link>
          </div>
        )}
      )}
      </Grid>
    </>
  );
}