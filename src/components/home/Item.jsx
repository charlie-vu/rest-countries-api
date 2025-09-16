import helper from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

export default function Item(props) {

    const { item } = props;
    const name = item?.name?.common;
    const flags = item?.flags;
    const pop = item?.population;
    const region = item?.region;
    const capital = item?.capital[0];
    const cca3 = item?.cca3;

    return (
        <Link href={`/${cca3}`}>
            <div className="card overflow-hidden h-100 hover-jump border-0 shadow-sm">
                <div className="ratio ratio-16x9 overflow-hidden shadow-sm">
                    <Image src={flags.svg} alt={flags.alt} width={500} height={500} className="object-fit-cover" />
                    {/* <img src={flags.svg} alt={flags.alt} className="object-fit-cover" /> */}
                </div>
                <div className="p-4">
                    <h5 className="fw-800">{name}</h5>
                    <div className="mt-3 d-stack gap-2">
                        <p><strong>Population:</strong> {helper.displayNumber(pop)}</p>
                        <p><strong>Region:</strong> {region}</p>
                        <p><strong>Capital:</strong> {capital}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}