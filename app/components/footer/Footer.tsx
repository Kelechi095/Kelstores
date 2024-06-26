import React from "react";
import Wrapper from "../Wrapper";
import FooterList from "./FooterList";
import Link from "next/link";
import {MdFacebook} from 'react-icons/md'
import {AiFillInstagram, AiFillTwitterCircle, AiFillYoutube} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Wrapper>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Video games</Link>
            <Link href="#">Fridges</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Air conditioners</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Services</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">FAQs</Link>
          </FooterList>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              We provide the best quality electronic services to our customers at the best rates. We have a wide
              selection of phones, Tvs, laptops, watches and accessories.
            </p>
            <p>&copy; {new Date().getFullYear()} Kelstores</p>
          </div>

          <div>
            <FooterList>
              <h3 className="text-base font-bold mb-2">Follow Us</h3>
              <div className="flex gap-2">
                <Link href="#"><MdFacebook size={24}/></Link>
                <Link href="#"><AiFillTwitterCircle size={24}/></Link>
                <Link href="#"><AiFillInstagram size={24}/></Link>
                <Link href="#"><AiFillYoutube size={24}/></Link>

              </div>
            </FooterList>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Footer;
