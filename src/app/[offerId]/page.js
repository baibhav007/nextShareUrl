import Image from "next/image";

// Function to fetch offer details (Server-Side)
async function getOffer(offerId) {
  const res = await fetch(`https://goldapi.loyaltty.com/retailer/deal/s/${offerId}`);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.success && data.data?.deal ? data.data.deal : null;
}

// Metadata generation for SEO and social sharing
export async function generateMetadata({ params }) {
  const offer = await getOffer(params.offerId);

  if (!offer) {
    return {
      title: "Deal Not Found",
      description: "Sorry, this deal is unavailable.",
    };
  }

 return {
  title: offer?.business_name || "Exclusive Deal", // Use optional chaining to avoid errors
  description: offer?.description || "Amazing deal available now!",
  openGraph: {
    title: offer?.business_name || "Exclusive Deal",
    description: offer?.description || "Amazing deal available now!",
    images:  offer?.deal_picture_url || "/loyaltty.png" ,
    // url: `https://6385-2401-4900-882a-c5d3-7996-88ed-2a25-7c99.ngrok-free.app/${params?.offerId || ""}`, // Ensure offerId is defined
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: offer?.business_name || "Exclusive Deal",
    description: offer?.description || "Don't miss out!",
    image: offer?.deal_picture_url || "/loyaltty.png",
  },
};
}

// React component (Default Export)
export default async function OfferPage({ params }) {
  const offer = await getOffer(params.offerId);

  if (!offer) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Image
          src="/opps.jpeg"
          alt="Deal not found"
          width={500}
          height={500}
          className="w-full max-w-lg h-auto object-contain"
        />
        <p className="text-red-500 text-xl mt-4">Sorry, this deal is unavailable.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#040869] p-10">{offer.business_name}</h1>

      <div className="relative mx-auto p-4 text-white overflow-hidden max-w-sm mb-4">
        <div className="relative border border-black w-full rounded-xl">
          <Image
            src={offer.deal_picture_url || "/loyaltty.png"}
            alt="Promo"
            width={400}
            height={250}
            className="w-full h-[250px] object-cover rounded-t-xl"
          />
            <div className="absolute top-4 left-2 flex items-center">
            <img src="star.png" alt="Star" className="w-16 h-16 object-contain" />
            <div
              className="absolute text-white text-xl font-bold"
              style={{
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                textAlign: 'center',
              }}
            >
              ${offer.price}
            </div>
          </div>
          <div className="p-4 bg-[#040869] rounded-b-xl">
            <h3 className="text-lg font-bold">{offer.name}</h3>
            {offer.end_date && (
              <p className="mt-2 text-base text-[#FF7676]">
                Exp {new Date(offer.end_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            )}
            <p className="mt-2">{offer.description}</p>
          </div>
        </div>
      </div>

      <h4 className="mt-5 text-[#040869]">Powered By</h4>
      <Image src="/loyaltty.jpg" alt="Powered By" width={160} height={80} className="w-40 mt-2" />
    </div>
  );
}
