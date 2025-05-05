import Item from "@/components/home/Item";
import helper from "@/utils/helper";

export default function Home() {
  return (
    <div className="container py-5 page-home">
      <div className="row row-cols-1 row-cols-lg-4 g-5">
        {
          [...Array(10)].map((_, i) =>
            <div key={`item-${i}`} className="col">
              <Item />
            </div>
          )
        }

      </div>
    </div>
  );
}
