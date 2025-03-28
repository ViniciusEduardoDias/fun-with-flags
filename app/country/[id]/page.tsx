import Image from "next/image";
import Link from "next/link";

type Props = {
    params: Promise<{ id: string }>
}
export default async function Country({ params }: Props) {
    const { id } = await params;
    const name = "Brazil"


    return (
        <>  
            <div>
                <Link href="/">
                    <button className="bg-gray-200 hover:bg-gray-800 hover:text-white font-semibold py-2 px-4 rounded mb-5">
                        Back
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
                <div className="aspect-video w-full">
                <Image
                    src="/flag-placeholder.svg"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    alt={`Flag of ${name}`}
                />
                </div>
                <div className="flex flex-col justify-center p-6 text-sm text-gray-600">
                    <h2 className="text-xl font-semibold mb-4">Brazil {`(${id})`}</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Capital:</span>
                            <span>Brasília</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font font-semibold">Region:</span>
                            <span>South America</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Population:</span>
                            <span>210000000</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Languagens:</span>
                            <span>Portuguese</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Currencies:</span>
                            <span>BRL</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Top Level Domain:</span>
                            <span>.br</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Borders:</span>
                            <span>ARG, BOL, VEN, URU</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
