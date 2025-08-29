import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaQuestionCircle } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const faqs = [
  {
    question: "What is a courier service?",
    answer: (
      <>
        A courier service is a professional delivery solution that transports parcels, documents, or goods from one location to another, both domestically and internationally. These services ensure safe, fast, and reliable shipping, often providing tracking, insurance, and customer support. Most couriers operate with their own network and logistics system, allowing for door-to-door delivery and pickup options. Using a courier helps individuals and businesses send important items securely, efficiently, and with peace of mind.
      </>
    ),
  },
  {
    question: "How can I book a parcel?",
    answer: (
      <>
        You can book a parcel by visiting the courier’s website, using their mobile app, or physically going to a local branch/office. The process usually involves entering the sender and receiver details, selecting the type of service (standard, express, etc.), specifying the parcel size and weight, and choosing payment options. Many couriers also offer on-demand pickup, making it convenient to send parcels directly from your home or office.
      </>
    ),
  },
  {
    question: "How do I track my package?",
    answer: (
      <>
        After booking your parcel, you’ll receive a tracking number. Enter this number on the courier’s website or app to view real-time updates about your package’s location and delivery status. Tracking systems provide information such as pickup confirmation, transit checkpoints, expected delivery date, and final delivery confirmation. It’s an essential way to stay informed and quickly address any delivery issues.
      </>
    ),
  },
  {
    question: "How are courier charges determined?",
    answer: (
      <>
        Courier charges depend on several factors: the weight and size of the package, the distance between sender and receiver, the type of service (express, standard, overnight), and any additional features like insurance or special handling. Most couriers offer a rate calculator online so you can estimate costs before booking. International deliveries may also include customs charges or import/export fees.
      </>
    ),
  },
  {
    question: "Can I send parcels internationally?",
    answer: (
      <>
        Yes, many courier services offer international delivery to countries around the world. You’ll need to provide accurate customs information and check for any restrictions on prohibited items. International courier services may require additional documents, and delivery times will vary depending on destination and customs clearance processes. Always check the courier’s guidelines for international shipments before booking.
      </>
    ),
  },
  {
    question: "How long does delivery take?",
    answer: (
      <>
        Delivery time depends on the destination, service type, and courier company. For local shipments, delivery can take 1–2 business days; for national deliveries, typically 2–5 days. Express or same-day services may be available for urgent parcels. International shipping times vary, usually between 3–10 business days, depending on customs and transit routes. You can check estimated delivery times during the booking process.
      </>
    ),
  },
  {
    question: "What items are prohibited in courier?",
    answer: (
      <>
        Couriers generally prohibit the shipment of illegal items, explosives, flammable substances, firearms, drugs, perishable foods, live animals, and other items restricted by law. Some couriers may have additional restrictions on liquids, fragile goods, or high-value items. Always review the courier’s prohibited item list or contact customer service before sending anything you’re unsure about.
      </>
    ),
  },
  {
    question: "How will I know when my package is delivered?",
    answer: (
      <>
        Once your package is delivered, most courier services will notify you via SMS, email, or app notification. You can also check the delivery confirmation using your tracking number. Some couriers provide proof of delivery, such as receiver’s signature or photo, for added security. If you don’t receive a notification, you can contact customer support for confirmation.
      </>
    ),
  },
  {
    question: "What if my package is lost?",
    answer: (
      <>
        If your package is lost in transit, contact the courier’s customer support immediately with your tracking number and shipment details. Most couriers have a claims process for lost items, which may include investigation and compensation if the parcel is insured. Keep your booking and payment records, and file your claim as soon as possible for quick resolution.
      </>
    ),
  },
  {
    question: "How can I pay for courier service?",
    answer: (
      <>
        Payment options typically include cash at the branch, credit or debit card, mobile banking, online payment gateway, or cash on delivery (COD) if available. You’ll select your preferred payment method while booking. Some couriers also accept payment via mobile wallets or bank transfer for added convenience.
      </>
    ),
  },
  {
    question: "How safe is courier service?",
    answer: (
      <>
        Courier services are generally safe, especially if you choose a reputable company. Most offer package tracking, insurance options, and secure handling procedures. For valuable or fragile items, you can opt for extra insurance or special packaging. If you have concerns, review the courier’s policies or customer reviews before booking.
      </>
    ),
  },
  {
    question: "What are the office hours?",
    answer: (
      <>
        Courier office hours vary by location and company, but most operate from 9 AM to 8 PM on weekdays. Some branches may be open on weekends or offer extended hours, especially for express services. Check your local branch’s schedule on the courier’s website or by calling customer support.
      </>
    ),
  },
  {
    question: "Is Cash on Delivery (COD) available?",
    answer: (
      <>
        Yes, Cash on Delivery is available with many courier services. This allows the receiver to pay for the parcel upon receipt. COD is popular for e-commerce deliveries and business transactions. You can select COD while booking if the service is available for your destination.
      </>
    ),
  },
  {
    question: "Do I need an ID for courier service?",
    answer: (
      <>
        Some courier services require you to provide a valid ID, national ID card, or phone number for booking and delivery, especially for high-value or sensitive parcels. This helps with identification and ensures secure delivery. Always carry your ID when visiting a branch or receiving a package.
      </>
    ),
  },
  {
    question: "Can I send liquids or food items?",
    answer: (
      <>
        Certain couriers allow shipment of liquids or food items, but specific rules and packaging requirements apply. Foods must be non-perishable and securely packed; liquids should be sealed and labeled. Check with your courier about their policies before sending such items, and avoid prohibited or hazardous substances.
      </>
    ),
  },
  {
    question: "What happens if delivery fails?",
    answer: (
      <>
        If delivery fails (e.g., receiver not available, wrong address), couriers usually attempt delivery again, notify the sender, or return the package to the sender. Charges may apply for repeated delivery attempts or returns. Always provide accurate receiver information and keep your phone available for delivery updates.
      </>
    ),
  },
  {
    question: "Can I send gifts through courier?",
    answer: (
      <>
        Yes, you can send gifts, parcels, and documents through courier services. Be sure to pack gifts securely, include a receiver’s address and phone number, and declare the contents if required. Some couriers offer special gift packaging or greeting card options for festive deliveries.
      </>
    ),
  },
  {
    question: "Is delivery available on Fridays or holidays?",
    answer: (
      <>
        Many courier services operate seven days a week, including Fridays and public holidays. However, delivery times may vary, and some services may have limited operations on holidays. Check with your courier or branch for their holiday schedule before booking urgent deliveries.
      </>
    ),
  },
  {
    question: "How much does courier charge?",
    answer: (
      <>
        Courier charges start from around 50 BDT for small parcels, increasing with weight, distance, and service type (express, standard, international). You can use online calculators or contact customer service for exact pricing before booking your shipment.
      </>
    ),
  },
  {
    question: "Why is phone number required for courier?",
    answer: (
      <>
        A phone number is required for communication, delivery confirmation, and notifications. It allows the courier to contact the sender or receiver in case of issues, address verification, or delivery updates. Providing an accurate phone number helps ensure timely and successful delivery.
      </>
    ),
  },
];

export default function FAQ() {
  const [customQuestion, setCustomQuestion] = useState("");
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Simulate custom answer (you can integrate AI/chatbot/API here)
  const handleCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) {
      setCustomAnswer("Please enter your question...");
      return;
    }
    setCustomAnswer(
      "Your question has been received. Our team will reply soon, or you may contact customer support."
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:to-orange-900 py-8 px-2">
      <div className="w-full md:w-10/12 mx-auto">
        <Card className="mb-8 shadow-md border-0 rounded-2xl bg-gradient-to-r from-orange-100 to-blue-50 dark:from-gray-900 dark:to-blue-950">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <FaQuestionCircle className="text-orange-500 text-3xl" />
              <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent tracking-tight">
                Courier FAQ
              </CardTitle>
            </div>
            {/* <p className="text-lg text-gray-800 dark:text-gray-100">
              20 common questions about courier services. You can also ask your own question below!
            </p> */}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white dark:bg-gray-950 rounded-xl shadow border border-orange-100 dark:border-orange-900 overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className={`w-full flex items-center justify-between px-5 py-4 focus:outline-none transition 
                      ${openIndex === i 
                        ? "bg-orange-50 dark:bg-orange-900" 
                        : "bg-white dark:bg-gray-950 hover:bg-orange-50 dark:hover:bg-orange-900"} 
                      text-left font-semibold text-orange-700 dark:text-orange-300`}
                    aria-expanded={openIndex === i}
                  >
                    <span>{faq.question}</span>
                    <span className="ml-4 text-xl">
                      {openIndex === i ? <IoMdRemove /> : <IoMdAdd />}
                    </span>
                  </button>
                  <div
                    className={`px-5 pb-5 text-gray-700 dark:text-gray-200 transition-all duration-200 
                      ${openIndex === i ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
                    style={{
                      transitionProperty: "max-height, opacity",
                    }}
                  >
                    {openIndex === i && (
                      <div>{faq.answer}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Custom Question Section */}
            <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-900 rounded-xl shadow border border-orange-100 dark:border-orange-900">
              <h2 className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">Ask Your Own Question</h2>
              <form onSubmit={handleCustomQuestion} className="flex flex-col md:flex-row gap-3 items-center">
                <Input
                  type="text"
                  placeholder="Type your question..."
                  value={customQuestion}
                  onChange={(e) => {
                    setCustomQuestion(e.target.value);
                    setCustomAnswer(null);
                  }}
                  className="w-full md:w-2/3"
                />
                <Button type="submit" className="w-full md:w-auto">
                  Submit Question
                </Button>
              </form>
              {customAnswer && (
                <div className="mt-4 p-3 rounded bg-white dark:bg-gray-950 border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300">
                  {customAnswer}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        {/* Footer note */}
        <div className="text-center text-xs text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} Logisti Core. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}