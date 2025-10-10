import { motion } from "framer-motion";
import { PLANS_CONTENT } from "../constants/index";

const PricingPlans = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Use a small stagger on the parent (0.15s)
        when: "beforeChildren", // Ensure parent waits for the section heading to finish
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8, // Slightly longer duration for a smoother feel
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="pricing">
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Only animate once, when 50% visible
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-12 border-t border-neutral-800"
        >
          <h2 className="text-3xl lg:text-5xl mt-20 tracking-tighter bg-gradient-to-t from-neutral-50 via-neutral-300 to-neutral-600 bg-clip-text text-transparent">
            {PLANS_CONTENT.sectionTitle}
          </h2>

          <p className="mt-4">{PLANS_CONTENT.sectionDescription}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Animate once when 10% visible
          variants={containerVariants}
          // Use 'lg:flex' and 'items-stretch' to ensure all cards have the same height
          className="grid grid-cols-1 lg:grid-cols-3 place-items-center justify-items-center gap-8 lg:items-stretch"
        >
          {PLANS_CONTENT.plans.map((plan, index) => (
            <motion.div
              key={index}
              custom={index} // Pass the index as a custom prop for the child variant's delay
              variants={cardVariants}
              className={`max-lg:max-w-sm flex flex-col p-8 rounded-xl shadow-lg transition-all duration-300 
                ${
                  plan.popular
                    ? "border-2 border-blue-600 bg-blue-950/20 hover:shadow-blue-900/50" // Highlighted popular card
                    : "border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 lg:mt-8"
                }
              `}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-blue-600 text-white text-xs py-1 px-3 rounded-full uppercase font-bold tracking-wider">
                    {PLANS_CONTENT.popularBadge}
                  </span>
                </div>
              )}
              <h3 className="text-xl lg:text-3xl mb-4 tracking-tighter uppercase">
                {plan.name}
              </h3>
              <p className="text-neutral-400 mb-6">{plan.description}</p>
              <div className="text-2xl lg:text-3xl font-medium mb-6">
                {plan.price}
              </div>
              <ul className="mb-8 space-y-2 text-neutral-400">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              {/* CTA Button (Stays at the bottom) */}
              <button
                className={`cursor-pointer w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300 mt-auto 
                  ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-500" // Highlighted CTA
                      : "bg-neutral-800 text-neutral-100 hover:bg-neutral-700" // Standard CTA
                  }`}
              >
                {PLANS_CONTENT.ctaText}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;
