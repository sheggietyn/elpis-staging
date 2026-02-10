"use client";
import React from "react";
import classNames from "classnames";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { CenteredTag } from "../cardcomp/cards";
import Link from "next/link";
import { UpskillBanner } from "./HeroFollow";

const AccordionFaq = () => (
  <>
    <div className="flex justify-center bg-safe-gradient items-center py-20">
      <div className="w-full max-w-xl">
        <CenteredTag TextSpark={"Elpis Academy FAQ "} />
        <div className="text-center mb-16">
          <h2 className="text-2xl font-cinzel md:text-4xl font-bold font-playfair text-gray-900 mb-4">
            Frequently Asked Question
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to your question, you can also contact us for support
          </p>
        </div>
        <Accordion.Root
          className="bg-gray-50 w-full text-gray-900 rounded-md md:px-0 px-2 shadow-lg"
          type="single"
          defaultValue="item-1"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              1. What exactly is Elpis Academy?
            </AccordionTrigger>
            <AccordionContent>
              Elpis Academy is a faith-driven trading school where we teach
              people how to master the forex market using proven
              strategies—guided by both financial wisdom and spiritual values.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>2. Who is Elpis Academy for?</AccordionTrigger>
            <AccordionContent>
              Elpis is for beginners, intermediate traders, and even those who
              have failed before. If you’re ready to learn, be mentored, and
              grow spiritually and financially, you’re welcome.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              3. What’s included in each plan?
            </AccordionTrigger>
            <AccordionContent>
              Each Elpis Academy plan gives you access to trading signals,
              mentorship, digital resources, and exclusive bonuses. You can view
              full plan breakdowns{" "}
              <Link href="/pricing">
                <p className="text-primary font-semibold">View Price Plan</p>
              </Link>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              4. Is this a monthly subscription?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Our Elpis and Kodesh plans are monthly/6-week options.
              Dunamis Rahab is a 3-month bundle. You can cancel or upgrade
              anytime.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              5. How do I access the trading ideas?
            </AccordionTrigger>
            <AccordionContent>
              Once you sign up, you’ll be added to a private Telegram group
              where your signals will be delivered daily based on your plan.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
              6. Do I need any prior trading experience?
            </AccordionTrigger>
            <AccordionContent>
              No! We teach from scratch. Our beginner-friendly curriculum is
              designed to help you grow with confidence, even if you’ve never
              traded before.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>
              7. How is this different from other trading platforms?
            </AccordionTrigger>
            <AccordionContent>
              Elpis blends skill and strategy with Scripture and mentorship.
              We’re not just another signal service—we’re a movement raising
              wise and wealthy believers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>
              8. Can I earn money by referring others?
            </AccordionTrigger>
            <AccordionContent>
              Yes! We offer a powerful affiliate program with bonuses and
              commissions. You’ll receive your referral link after purchasing an
              affiliate kit.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>
              9. What payment methods are supported?
            </AccordionTrigger>
            <AccordionContent>
              We currently accept Paystack, Stripe, and USDT. If you have any
              issues, our support team is available to assist.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>
              11. Who is the founder of Elpis Academy?
            </AccordionTrigger>
            <AccordionContent>
              Elpis Academy was founded by *Favour Peace Ayemere*, a digital
              mogul, trading mentor, and faith-based entrepreneur. After
              building multiple income streams and mentoring thousands across
              the globe, she created Elpis to be more than a platform — it’s a
              kingdom assignment to raise financially equipped believers.
              <i>“She prayed. She built. Now she teaches others.</i>
            </AccordionContent>
          </AccordionItem>
        </Accordion.Root>
      </div>
    </div>

    <UpskillBanner />
  </>
);

const AccordionItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={classNames(
        "focus-within:shadow-black mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus:outline-none",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={classNames(
          "text-gray-900 hover:bg-lightgold group border border-gray-100 flex h-[45px] flex-1 cursor-pointer items-center justify-between text-left bg-white font-semibold px-5 py-10 text-[15px] leading-none w-full",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon
          className="text-gray-900 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames(
        "text-gray-900 text-left bg-white data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px] w-full",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-4 px-5">{children}</div>
    </Accordion.Content>
  )
);

export default AccordionFaq;
