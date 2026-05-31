import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// ── EmailJS config from .env ──────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus]   = useState(null); // "sending" | "success" | "error"
  const [openFaq, setOpenFaq] = useState(null);

  // ── Pre-fill form with logged-in user data from localStorage ─────────────
  useEffect(() => {
    try {
      // Try common keys used to store user objects in localStorage
      const raw =
        localStorage.getItem("user") ||
        localStorage.getItem("loggedUser") ||
        localStorage.getItem("currentUser") ||
        sessionStorage.getItem("user") ||
        sessionStorage.getItem("loggedUser") ||
        sessionStorage.getItem("currentUser");

      if (raw) {
        const user = JSON.parse(raw);
        setFormData((prev) => ({
          ...prev,
          fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          email: user.email ?? "",
        }));
      }
    } catch {
      // If parsing fails, leave form empty
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ── Send via EmailJS ──────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const templateParams = {
      from_name:  formData.fullName,
      from_email: formData.email,       // logged-in user's email shown in the email
      phone:      formData.phone || "Not provided",
      subject:    formData.subject,
      message:    formData.message,
      to_email:   "icomputers512@gmail.com",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData((prev) => ({ ...prev, phone: "", subject: "", message: "" }));
      setTimeout(() => setStatus(null), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus(null), 4000);
    }
  };

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  // ── Data ──────────────────────────────────────────────────────────────────
  const infoCards = [
    {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.23 1.02L7.91 9.24a16.05 16.05 0 006.85 6.85l1.24-1.21a1 1 0 011.02-.23l3.3 1.1a1 1 0 01.68.95V19a2 2 0 01-2 2C9.16 21 3 14.84 3 7V5z" />
        </svg>
      ),
      title: "Phone Number",
      main: "+94 77 123 4567",
      sub: "Mon - Sat : 9AM - 6PM",
    },
    {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Address",
      main: "icomputers512@gmail.com",
      sub: "We reply within 24 hours",
    },
    {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Our Location",
      main: "123, Galle Road,",
      sub: "Colombo 04, Sri Lanka",
      link: true,
    },
    {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Working Hours",
      main: "Mon - Sat : 9AM - 6PM",
      sub: "Poya Days : Closed",
    },
  ];

  const faqs = [
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
      question: "How long does delivery take?",
      answer: "Delivery usually takes 1-3 working days within Colombo and 2-5 working days for other areas.",
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email or SMS to track your order.",
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>,
      question: "Can I return a product?",
      answer: "Yes, you can return a product within 7 days if it's damaged or if the wrong item was delivered.",
    },
    {
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      question: "Do you provide warranty?",
      answer: "Yes, all our products come with official warranty based on the brand policy.",
    },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-primary">

      {/* Hero */}
      <div className=" relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-50 h-50 rounded-full bg-accent opacity-10 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-accent opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
          <span className=" text-5xl font-bold tracking-[4px] text-accent uppercase mb-3">
            Get In Touch
          </span>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            We&apos;re here to help. Reach out through any channel below and we&apos;ll get back to you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {infoCards.map((card, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="bg-accent rounded-full w-11 h-11 flex items-center justify-center flex-shrink-0 shadow-md shadow-accent/30">
                {card.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{card.title}</p>
                <p className="text-sm font-semibold text-gray-800">{card.main}</p>
                <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
                {card.link && (
                  <a href="https://maps.google.com/?q=123+Galle+Road+Colombo" target="_blank" rel="noreferrer" className="text-xs text-accent font-semibold mt-1.5 inline-block hover:underline">
                    Get Directions →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-secondary">Send Us a Message</h2>
            <div className="w-10 h-[3px] bg-accent rounded-full mt-2 mb-3" />
            <p className="text-sm text-slate-500 mb-6">
              Have a question or need help? Fill out the form and we&apos;ll get back to you.
            </p>

            {/* Status alerts */}
            {status === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Message sent! We&apos;ll get back to you shortly.
              </div>
            )}
            {status === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
                  />
                  {/* Badge shown when email is auto-filled from login */}
                  {formData.email && (
                    <span className="absolute -top-2 right-2 text-[10px] bg-accent text-white font-bold px-2 py-0.5 rounded-full">
                      auto-filled
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
                />
              </div>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition resize-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex items-center gap-2 bg-accent hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 text-white text-sm font-bold px-7 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-accent/30"
              >
                {status === "sending" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-secondary">Our Location</h2>
            <div className="w-10 h-[3px] bg-accent rounded-full mt-2 mb-5" />
            <div className="rounded-xl overflow-hidden h-[340px] border border-slate-100">
              <iframe
                title="iComputers Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467128064!2d79.85370317496678!3d6.896082793104449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25978954b6c0b%3A0xdd16d8d37c9d3c4b!2sGalle%20Rd%2C%20Colombo!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-10">
          <h2 className="text-xl font-bold text-secondary">Frequently Asked Questions</h2>
          <div className="w-10 h-[3px] bg-accent rounded-full mt-2 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                onClick={() => toggleFaq(i)}
                className={`border rounded-xl px-5 py-4 cursor-pointer transition-all duration-200 select-none ${
                  openFaq === i ? "border-accent bg-accent/5" : "border-slate-200 bg-slate-50 hover:border-accent/50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${openFaq === i ? "bg-accent text-white" : "bg-secondary/10 text-secondary"}`}>
                      {faq.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-800">{faq.question}</span>
                  </div>
                  <svg className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180 text-accent" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {openFaq === i && (
                  <p className="text-sm text-slate-500 mt-3 pl-12 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Banner */}
      <div className="bg-secondary px-6 py-8">
        <div className="max-w-6xl mx-auto flex sm:flex-col lg:flex-row items-center justify-between gap-6 lg:mb-0 mb-15">
          <div className="flex items-center gap-5">
            <div className="bg-accent rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/40">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M6.343 6.343a8 8 0 000 11.314" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">Still need help?</p>
              <p className="text-slate-400 text-sm mt-0.5">Chat with our support team on WhatsApp.</p>
            </div>
          </div>
          <a
            href="https://wa.me/94771234567"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 border-2 border-white/70 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-white hover:text-secondary transition-all duration-200 active:scale-95"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

    </div>
  );
};

export default ContactPage;