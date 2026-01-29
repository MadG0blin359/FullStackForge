import React, { useState } from "react";
import { Mail, MapPin, Github, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isCopied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    const formPayload = new FormData();
    formPayload.append("access_key", "d8870983-3f7c-4198-b7db-c20bf75fad3a");
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("subject", formData.subject);
    formPayload.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("Something went wrong. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "shawaizshahid312@gmail.com",
      href: "mailto:shawaizshahid312@gmail.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, Pakistan",
      href: "maps:hyderabd,Pakistan",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/MadG0blin359/",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shawaiz-shahid-2695181b5/",
    },
  ];

  const handleCopy = async (label, content) => {
    if (label != "Email" || isCopied) return;

    if (navigator.clipboard) {
      // 1. Attempt to use the modern Clipboard API (works well outside iFrames)
      try {
        await navigator.clipboard.writeText(content);
        setCopied(true);
      } catch (err) {
        // If the modern API fails (due to permissions or iFrame context), use the fallback
        if (copyTextToClipboardFallback(content)) {
          setCopied(true);
        } else {
          alert("Copy failed. Please try manually.");
        }
      }
    } else {
      // 2. Fallback if navigator.clipboard is not available at all
      if (copyTextToClipboardFallback(content)) {
        setCopied(true);
      } else {
        alert("Copy failed. Clipboard API is unavailable.");
      }
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 px-4 relative min-h-dvh z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        {/* <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Have a project in mind or just want to chat? I'd love to hear from
          you. Send me a message and I'll respond as soon as possible.
        </p> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Form */}
          <div className="gradient-border p-8 card-hover">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-left text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${
                      errors.name ? "border-red-500" : "border-border"
                    } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-left text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${
                      errors.email ? "border-red-500" : "border-border"
                    } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-left text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-background border ${
                    errors.subject ? "border-red-500" : "border-border"
                  } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                  placeholder="Project Inquiry"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1 text-left">
                    {errors.subject}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-left text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg bg-background border ${
                    errors.message ? "border-red-500" : "border-border"
                  } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 text-left">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cosmic-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
              {submitMessage && (
                <p
                  className={`text-center text-sm ${
                    submitMessage.includes("Thank you")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {submitMessage}
                </p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-4 gradient-border card-hover group active:scale-95"
                    onClick={() => handleCopy(info.label, info.value)}
                  >
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-left">{info.label}</p>
                      <p className="text-muted-foreground">{info.value}</p>
                      {isCopied && info.label == "Email" && (
                        <p className="text-left text-sm text-green-500">
                          Email copied!
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
