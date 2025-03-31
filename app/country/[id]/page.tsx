'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiCountries } from "../../services";
import { useParams } from "next/navigation";
import { formatNumber } from "../../utils";


type Params = {
    id: string;
}
type DetailsCountry = {
    cca3: string;
    flags: {
      svg: string;
    };
    name: {
        common: string;
        official: string;
    };
    capital?: string[];
    region: string;
    population: number;
    languages: Record<string, string>;
    currencies: Record<string, {name: string; symbol: string}>
    tld: string[];
    borders: string[];
  };

export default function Country(){
    const params = useParams<Params>()
    const [id, setId] = useState<string | null>(null);
    const [country, setCountry] = useState<DetailsCountry>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        if(params?.id && params.id !== id){
            setId(params.id)
        }
    }, [params, id])

    useEffect(() => {
    const fetchCountry = async () => {
        const [response, error] = await apiCountries.getCountry(id)
        setLoading(false)
        if(error){
            setError(error)
            console.log(error)
        }
        setCountry(response[0])
    }
    if(id){
        fetchCountry();
    }
}, [id]);

    if(loading) return <div>Loading...</div>;
    if(error) return <div>{error}</div>;
    const {
            flags,
            name,
            capital, 
            region, 
            population, 
            languages, 
            currencies, 
            tld, 
            borders
        } = country ?? {};

    const {svg: flag} = flags ?? {};
    const {common: countryName, official: officialName} = name ?? {};
    const [capitalName] = capital ?? ["Não há capital identificada!"];
    const languagesNames = Object.values(languages ?? {}).join(", ")
    const currenciesNames = Object.values(currencies ?? {})
        .map(({name, symbol}) => `${name}(${symbol})`)
        .join(", ")
    const [topLevelDomain] = tld ?? [];
    const bordersIds = borders ?? [];
    
    return (
        <>  
            <div>
                <Link href="/">
                    <button className="bg-gray-200 hover:bg-gray-800 hover:text-white font-semibold py-2 px-4 rounded mb-5">
                        Back
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
                <div className="flex items-center md:max-[400px]:">
                <Image
                    src={flag || "/flag-placeholder.svg"}
                    width={600}
                    height={400}
                    className="max-h-80 object-cover rounded-lg"
                    alt={`Flag of ${name}`}
                    priority
                />
                </div>
                <div className="flex flex-col justify-center p-6 text-sm text-gray-600">
                    <h2 className="text-xl font-semibold mb-4">{countryName}{`(${id})`}</h2>
                    <div className="space-y-2">
                        <div>
                            <span className="font-semibold">Official Name:</span> {officialName}
                        </div>
                        <div>
                            <span className="font-semibold">Capital:</span> {capitalName}
                        </div>
                        <div>
                            <span className="font font-semibold">Region:</span> {region}
                        </div>
                        <div>
                            <span className="font-semibold">Population:</span> {formatNumber(population)}
                        </div>
                        <div>
                            <span className="font-semibold">Languages:</span> {languagesNames}
                        </div>
                        <div>
                            <span className="font-semibold">Currencies:</span> {currenciesNames}
                        </div>
                        <div>
                            <span className="font-semibold">Top Level Domain:</span> {topLevelDomain}
                        </div>
                        <div className="md:max-w-80">
                            <span className="font-semibold">Borders:</span> {bordersIds.length > 0 ? bordersIds.map((borderId) => (
                                <Link key={borderId} href={`/country/${borderId}`}>
                                <button className="bg-gray-200 hover:bg-gray-800 hover:text-white py-[1.5px] px-2 rounded mb-2 mr-2">
                                    {borderId}
                                </button>
                                </Link>
                            )) : "None"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
