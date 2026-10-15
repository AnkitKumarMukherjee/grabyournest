/* Central configuration. Replace clearly marked placeholders before launch. */
window.GYN_CONFIG = {
  brand: "Grab Your Nest",
  supportEmail: "contact@grabyournest.com",
  // Add the real international-format WhatsApp number without + or spaces, e.g. "91XXXXXXXXXX".
  whatsappNumber: "",
  // Add your provider's real form endpoint after creating and testing the form integration.
  formEndpoint: "",
  // Add a real GA4 measurement ID only after creating the property and reviewing consent requirements.
  analyticsId: "",
  templates: [
    { id:"clinic", name:"Clinic Website", category:"Healthcare", price:"₹2,500–₹3,000", description:"A clean, reassuring website concept for a clinic or healthcare practice.", url:"https://grabyournest.com/clinic", visual:"clinic" },
    { id:"spa", name:"Spa Website", category:"Wellness", price:"₹2,000–₹2,500", description:"A calm, premium web presence concept for a spa or wellness centre.", url:"https://grabyournest.com/spa", visual:"spa" },
    { id:"gym", name:"Gym Website", category:"Fitness", price:"₹1,500–₹2,000", description:"A bold website concept for a gym, fitness studio, or personal trainer.", url:"https://grabyournest.com/gym", visual:"gym" },
    /* URL reproduced from the supplied prompt. Verify before publishing: the prompt contains conflicting property URLs. */
    { id:"property", name:"Property Website", category:"Real estate", price:"₹3,000–₹5,000", description:"A polished property catalogue concept for sales, rentals, and enquiries.", url:"https://property-grabyournest.com/property", visual:"property", needsUrlCheck:true }
  ],
  ebooks: [
    { id:"money", title:"The First 1 Lakh", price:"₹99", description:"Explore the ebook page for details.", url:"https://grabyournest.com/money", cover:"assets/images/ebook-first-1-lakh.png" },
    { id:"women", title:"What Women Actually Want", price:"₹99", description:"Explore the ebook page for details.", url:"https://grabyournest.com/women", cover:"assets/images/ebook-what-women-want.png" },
    { id:"jobs", title:"Career Code: Beyond the Resume", price:"₹99", description:"Explore the ebook page for details.", url:"https://grabyournest.com/jobs", cover:"assets/images/ebook-career-code.png" }
  ],
  services: [
    { id:"web-development", title:"Web Design & Development", description:"Responsive websites for businesses, creators, and independent professionals — with hosting support to get your site online.", icon:"✳" },
    { id:"web-app", title:"Custom Apps & Website Rebuilds", description:"Custom applications, API integrations, redesigns, and rebuilds — scoped after a mockup and project discussion.", icon:"▦" },
    { id:"automation", title:"Business Automation & Integrations", description:"Connect tools and APIs, automate repetitive tasks, and streamline business workflows. Custom work begins with a requirements discussion and mockup.", icon:"↗" },
    { id:"website-template", title:"Website Templates", description:"Choose a design, customise it for your brand, and launch it with hosting support.", icon:"▤" },
  ]
};
