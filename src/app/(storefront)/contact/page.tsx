"use client";

import React, { useState } from "react";
import { CheckCircle2, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

const FAQS = [
  {
    q: "How long does shipping take across India?",
    a: "Orders are processed within 24 to 48 hours. Express transit takes between 3 to 6 business days depending on your delivery PIN code.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "We offer a straightforward 7-day return and exchange policy on unused bags in their original packaging and tags intact.",
  },
  {
    q: "How do I care for my Swami Jap bag?",
    a: "Wipe gently with a soft, slightly damp microfibre cloth. Avoid harsh chemical cleaners and store in the provided dust bag when not in use.",
  },
  {
    q: "Will a 15.6-inch laptop fit in your work bags?",
    a: "Yes, our Commuter Laptop Bag features a padded sleeve specifically engineered for devices up to 15.6 inches with dedicated cable organizers.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="section-pad pt-28 sm:pt-32 bg-ivory">
      <div className="container-page">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: "Contact Us" }]} />

        {/* Header */}
        <div className="mt-4 pb-10 border-b border-border">
          <Badge variant="mustard">Customer Support</Badge>
          <h1 className="mt-4 font-serif text-h1 font-medium text-charcoal leading-tight">
            We’re here to <span className="italic text-dusty-rose-deep">help.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lead text-charcoal-soft font-sans leading-relaxed">
            Have questions about an order, dimensions, materials, or delivery timelines? Reach out to our customer care team and we’ll get back to you promptly.
          </p>
        </div>

        <div className="py-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-border bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="font-serif text-h3 font-medium text-charcoal">
                Send us a message
              </h2>
              <p className="mt-1 text-small text-charcoal-soft font-sans">
                Fill in the details below and we’ll respond within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="mt-8 rounded-lg border border-success-border bg-success-bg p-6 text-success-text animate-fade-in">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-serif text-base font-semibold">
                        Message received!
                      </h3>
                      <p className="mt-1 text-small leading-relaxed font-sans">
                        Thank you for reaching out, {formData.name}. Our customer care team has received your enquiry and will reply to <span className="font-semibold">{formData.email}</span> within 1 business day.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", email: "", subject: "Order Inquiry", message: "" });
                        }}
                        className="mt-4 text-caption font-semibold underline underline-offset-2"
                      >
                        Send another message
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-caption font-medium text-charcoal">
                        Full Name *
                      </label>
                      <Input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-caption font-medium text-charcoal">
                        Email Address *
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-caption font-medium text-charcoal">
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-1.5 h-11 w-full rounded-md border border-border bg-white px-3.5 text-small text-charcoal focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                    >
                      <option value="Order Inquiry">Order Inquiry &amp; Status</option>
                      <option value="Product Sizing">Product Sizing &amp; Laptop Compatibility</option>
                      <option value="Shipping & Returns">Shipping, Delivery &amp; Returns</option>
                      <option value="General Question">General Brand Question</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-caption font-medium text-charcoal">
                      Your Message *
                    </label>
                    <Textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="How can we help you today?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    Submit Message
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact Details & FAQs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-border bg-white p-6 shadow-xs space-y-5">
              <h3 className="font-serif text-h3 font-medium text-charcoal">
                Customer Care
              </h3>

              <div className="space-y-4 text-small font-sans text-charcoal-soft">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">Email Support</p>
                    <a
                      href="mailto:hello@swamijap.in"
                      className="text-brand-orange hover:text-brand-orange-hover underline underline-offset-2"
                    >
                      hello@swamijap.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">Support Hours</p>
                    <p>Monday to Saturday: 10:00 AM – 6:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">Fulfillment Center</p>
                    <p>Pan India Dispatch &amp; Doorstep Delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="rounded-xl border border-border bg-beige/60 p-6 space-y-4">
              <h3 className="font-serif text-base font-semibold text-charcoal">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3.5">
                {FAQS.map((faq) => (
                  <div key={faq.q} className="border-b border-border/80 pb-3 last:border-0 last:pb-0">
                    <p className="font-serif text-small font-medium text-charcoal">
                      {faq.q}
                    </p>
                    <p className="mt-1 text-caption text-charcoal-soft font-sans leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

