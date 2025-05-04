
import { BiSolidOffer } from "react-icons/bi";
import { FaLeaf } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

export default function Categories() {
  const options = [
    {
      icon: <MdLocalShipping className="text-4xl text-blue-600" />,
      title: "Hızlı Teslimat",
      description: "Aynı gün teslimat",
      bgColor: "bg-blue-100",
    },
    {
      icon: <FaLeaf className="text-4xl text-green-600" />,
      title: "Taze Ürünler",
      description: "Günlük taze ürünler",
      bgColor: "bg-green-100",
    },
    {
      icon: <BiSolidOffer className="text-4xl text-orange-600" />,
      title: "Hızlı Teslimat",
      description: "Aynı gün teslimat",
      bgColor: "bg-orange-100",
    },
    {
      icon: <MdLocalShipping className="text-4xl text-purple-600" />,
      title: "Hızlı Teslimat",
      description: "Aynı gün teslimat",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section className="mt-10 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {options.map((options, key) => (
        <div className={`flex items-center gap-3 p-4 rounded-lg ${options.bgColor}`}
        key={key}>
          <h3> {options.icon} </h3>

          <div>
            <h3>{options.title}</h3>
            <p>{options.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
