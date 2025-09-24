import React, { useState } from 'react';
import { BiSolidWalletAlt } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { TbSend } from 'react-icons/tb';
import { TbTransactionRupee } from 'react-icons/tb';
import Avatar from 'react-avatar';
import { motion, AnimatePresence } from "framer-motion";






const Navigation = () => (
  <nav className="flex items-center justify-between px-6 md:px-16 py-6">
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-md bg-blue-900 text-white flex items-center justify-center font-bold text-base">
        <BiSolidWalletAlt size={27} />
      </div>
      <span className="font-semibold text-2xl text-gray-900">Digital Kosh</span>
    </div>
    <div className="hidden md:flex items-center gap-12 text-gray-700 font-medium">
      <a href="#home" className="hover:text-gray-900 transition-colors cursor-pointer">
        Home
      </a>
      <a href="#about" className="hover:text-gray-900 transition-colors cursor-pointer">
        About
      </a>
      <a href="#contact" className="hover:text-gray-900 transition-colors cursor-pointer">
        Contact
      </a>
    </div>
  </nav>
);


const PhoneMockup = () => (
  <div className="relative">

    <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-80" />
    <div className="absolute -right-20 -bottom-30 w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-80" />


    <div className="relative w-80 h-[640px] bg-black rounded-[3rem] p-2 shadow-2xl">

      <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">

        <div className="h-10 bg-white relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl" />
        </div>


        <div className="flex-1 px-8 py-6 flex flex-col">

          <div className="flex items-center justify-center mb-8">
            <div className="h-8 w-8 rounded-md bg-blue-900 text-white flex items-center justify-center font-bold text-sm mr-3">
              <BiSolidWalletAlt size={25} />
            </div>
            <span className="text-xl font-medium text-gray-900">Digital Kosh</span>
          </div>


          <div className="text-center mb-10">
            <div className="text-md text-gray-500 mb-3">Wallet Balance</div>
            <div className="text-5xl font-bold text-gray-900">₹7,000</div>
          </div>


          <div className="flex gap-4">
            <div className="flex-1 bg-blue-800 rounded-2xl p-4 text-center text-white">
              <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-black"> <FaPlus /></span>
              </div>
              <div className="text-xs font-medium">Add Money</div>
            </div>

            <div className="flex-1 bg-blue-800 rounded-2xl p-4 text-center text-white">
              <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-black"><TbSend /></span>
              </div>
              <div className="text-xs font-medium">Send Money</div>
            </div>

            <div className="flex-1 bg-blue-800 rounded-2xl p-2 text-center text-white">
              <div className="w-8 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-black"><TbTransactionRupee /></span>
              </div>
              <div className="text-xs font-medium">Transactions</div>
            </div>
          </div>
        </div>
        <div className="h-10 bg-white relative flex justify-center items-center">
          <div className="w-28 h-1.5 bg-black rounded-full"></div>
        </div>

      </div>
    </div>
  </div>
);


const HeroSection = () => (
  <main className="flex items-center min-h-[calc(100vh-80px)] px-6 md:px-16 py-12">
    <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      <div className="order-2 lg:order-1">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 leading-none mb-6">
          A Wallet<br />
          App
        </h1>

        <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold mb-8">
          Inspired by Paytm
        </h2>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
          Manage your payments,<br />
          transfer funds, and check ,< br /> your balance easily with <br /> Digital Kosh.
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors duration-200 cursor-pointer">
           <a href="./Signup">Get Started</a>
        </button>
      </div>


      <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
        <PhoneMockup />
      </div>
    </div>
  </main>
);

const Customer = () => (
  <div className="flex flex-col items-center  py-20 bg-gray-50 w-screen  ">
    <div>
      <h1 className="text-4xl font-bold text-gray-900 ">What Our Users Say</h1>
      <p className="text-sm text-gray-600 max-w-2xl text-center pt-3 ">
        Hear from our satisfied customers.
      </p>
    </div>

    <div className='flex gap-6 pt-20' >
      <div className='h-60 w-96 bg-gray-200 rounded-2xl'>
        <div >
          <div className='flex pl-5 pt-5'>
            <div className='text-xl'>
              <Avatar name="Sneha " size="50" textSizeRatio={1.75} round={true} />
            </div>
            <div className='pl-5'>
              Sneha Sharma
              <p className='text-sm text-gray-700'>College Student </p>
            </div>
          </div>

        </div>
        <div className='pt-5 pl-5 pr-5 text-sm text-gray-700'>
          <p>
            Digital Kosh has made managing my finances so much easier. The user-friendly interface and seamless transactions have truly impressed me. Highly recommended!
          </p>
          <br />

          <p>
            <span className="text-yellow-500 text-3xl">★★★★</span>
          </p>
        </div>


      </div>
      <div className='h-60 w-96 bg-gray-200 rounded-2xl'>
        <div >
          <div className='flex pl-5 pt-5'>
            <div className='text-xl'>
              <Avatar name="Raj Singh " size="50" textSizeRatio={1.75} round={true} />
            </div>
            <div className='pl-5'>
              Raj Singh
              <p className='text-sm text-gray-700'>Software Engineer </p>
            </div>
          </div>

        </div>
        <div className='pt-5 pl-5 pr-5 text-sm text-gray-700'>
          <p>
            The best digital wallet app I've used! Secure, fast, and reliable. It has simplified my financial transactions significantly.
          </p>
          <br />

          <p>
            <span className="text-yellow-500 text-3xl">★★★★★</span>

          </p>
        </div>


      </div>
      <div className='h-60 w-96 bg-gray-200 rounded-2xl'>
        <div >
          <div className='flex pl-5 pt-5'>
            <div className='text-xl'>
              <Avatar name="Rajnish " size="50" textSizeRatio={1.75} round={true} />
            </div>
            <div className='pl-5'>
              Ratan
              <p className='text-sm text-gray-700'>Small Business Owner </p>
            </div>
          </div>

        </div>
        <div className='pt-5 pl-5 pr-5 text-sm text-gray-700'>
          <p>
            As a small business owner, Digital Kosh has been a game-changer. It helps me keep track of my expenses and payments effortlessly.
          </p>
          <br />

          <p>
            <span className="text-yellow-500 text-3xl">★★★★★</span>
          </p>
        </div>


      </div>

    </div>


  </div>

);

const Frequently = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const items = [
    {
      question: "What is Digital Kosh?",
      answer:
        "Digital Kosh is a modern wallet app that lets you store, send, and manage money securely from your phone."
    },
    {
      question: "Is my money safe with Digital Kosh?",
      answer:
        "Yes — we use industry-standard encryption, secure servers, and multi-factor authentication to protect your funds and data."
    },
    {
      question: "How can I add money to my wallet?",
      answer:
        "You can add money via UPI, debit/credit card, or netbanking from the 'Add Money' screen in the app."
    },
    {
      question: "Are there any fees for using Digital Kosh?",
      answer:
        "Most basic transactions are free. Some services may include small fees — check the pricing page for details."
    },
    {
      question: "How do I contact customer support?",
      answer:
        "Reach us via the in-app chat, email support@digitalkosh.example, or call our helpline listed on the Contact page."
    }

  ]


  function toggle(index: number) {
    setExpanded(prev => (prev === index ? null : index));
  }


  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
          Frequently Asked Questions
        </h2>


        <div className="space-y-4">
          {items.map((it, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden border border-transparent bg-gray-50 shadow-sm"
            >
              <button
                aria-expanded={expanded === i}
                onClick={() => toggle(i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-700">
                  {it.question}
                </span>


                <motion.span
                  animate={{ rotate: expanded === i ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-blue-200 text-blue-600"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </button>


              <AnimatePresence initial={false}>
                {expanded === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {it.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Home: React.FC = () => {
  return (
    <div className="h-screen bg-white">
      <Navigation />
      <HeroSection />
      <Customer />
      <Frequently />
    </div>
  );
};

export default Home;