// src/pages/AboutUs.jsx
import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import { Instagram, Facebook, Twitter, Github } from "lucide-react";

import one from "../../assets/general/one.png";
import missions from "../../assets/general/missions.png";
import cherchhaya from "../../assets/About/cher chhaya.png";
import chercheat from "../../assets/About/cher cheat.png";

const AboutUs = () => {
 // ======= Form State =======
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});
const [errors, setErrors] = useState({});
const [success, setSuccess] = useState("");

const validate = () => {
  const newErrors = {};
  if (!formData.name.trim()) newErrors.name = "Name is required.";

  if (!formData.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Invalid email format.";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required.";
  } else if (!/^\d+$/.test(formData.phone)) {
    newErrors.phone = "Phone number must be numeric.";
  }

  if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
  if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
  return newErrors;
};

const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Only allow numbers for phone field
  if (name === "phone") {
    if (value === "" || /^\d+$/.test(value)) {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  } else {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  setSuccess("");
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setSuccess("");
    return;
  }
  setErrors({});
  alert("Your message has been sent successfully! ✅"); // Show alert
  setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
};


  // ======= Mentor Data =======
  const mentors = [
    {
      name: "Mr. Chan Chhaya",
      role: "Mentor",
      expertise: "Offer support in Java & API",
      github: "github.com/it-chhaya",
      email: "it.chhaya@gmail.com",
      linkedin: "www.linkedin.com/in/chan-chhaya",
      image: cherchhaya
    },
    {
      name: "Ms. Srorng Sokcheat",
      role: "Mentor",
      expertise: "Offer support in Web Design",
      github: "github.com/Sokcheatsromg",
      email: "sokcheatsromg@gmail.com",
      linkedin: "www.linkedin.com/in/sromg-sokcheat",
      image: chercheat
    },
  ];

  // ======= Team Members Data =======
  const members = [
    {
      name: "Ms. Dorn Dana",
      role: "Web Design",
      img: "src/assets/About/dana.png",
      github: "#",
      linkedin: "#",
      email: "#",
      quote:
        "I am human compiler who turn nonsense requirements into broken code and pretend like I know why.",
    },
    {
      name: "Mr. Rith Saranamith",
      role: "Java App",
      img: "src/assets/About/Manith.png",
      github: "#",
      linkedin: "#",
      email: "#",
      quote:
        "Git commit messages should really just say: 'I have no idea what I'm doing, but it works.'",
    },
    {
      name: "Mr. Ong Endy",
      role: "Java App",
      img: "src/assets/About/endy.png",
      github: "#",
      linkedin: "#",
      email: "#",
      quote:
        "Coffee in one hand, confidence in the other, and a brilliant algorithm in my head. Error? No problem.",
    },
    {
      name: "Ms. Mon Sreynet",
      role: "Web Design",
      img: "src/assets/About/sreynet.png",
      github: "#",
      linkedin: "#",
      email: "#",
      quote:
        "My greatest achievement isn't the code I've written, but the problems I've solved from my coding.",
    },
    {
      name: "Ms. Tith Cholna",
      role: "Web Design",
      img: "src/assets/About/cholna.png",
      github: "#",
      linkedin: "#",
      email: "#",
      quote:
        "Dark mode isn’t just a feature... it’s how developers hide their tears in the UI.",
    },
    {
      name: "Lonh Raksmey",
      role: "Web Design",
      img: "/src/assets/About/Smey.png",
      github: "#",
      linkedin: "#",
      email: "#",
      quote:
        "I am human compiler who turn nonsense requirements into broken code and then act like we know why.",
    },
  ];

  return (
    <div className="bg-white">
      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 ml-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              About <span className="text-primary">TaskFlow</span>
            </h1>
            <p className="text-gray-800 text-lg leading-relaxed">
              TaskFlow was founded with the belief that planning should never be <br />
              overwhelming. It started as a simple idea to help individuals or teams <br />
              track daily tasks more effectively.
            </p>
          </div>
          <div className="flex-1 pb-2">
            <img src={one} alt="Team collaboration" className="rounded-lg w-full py-5" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary mb-3">Our Mission</h2>
        </div>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 mr-12">
            <img
              src={missions}
              alt="Mission illustration"
              className="rounded w-full py-5 max-w-3xl mx-auto"
            />
          </div>
          <div className="flex-1 mr-3 mt-6">
            <p className="text-gray-800 text-lg leading-relaxed mt-12">
              TaskFlow’s vision is to make work organization simple, visual, and powerful <br />
              for everyone. We aim to create a platform where individuals and teams can <br />
              manage their tasks, and goals with ease, enabling them to focus on what truly <br />
              matters getting things done and achieving success.
            </p>
          </div>
        </div>
      </section>

     {/* Contact Section */}
<h2 className="text-3xl font-bold text-primary m-8 md:m-16 text-center">Contact Us</h2>
<section className="flex justify-center py-10 md:py-16 bg-gray-50 border border-blue-800 relative w-[90%] md:w-[70%] mx-auto rounded-xl mb-10 md:mb-20 px-4 sm:px-8">
  <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20 w-full">
    
    {/* Left Side: Info */}
    <div className="flex-1 p-5 flex flex-col lg:pr-10">
      <h3 className="text-2xl font-bold text-secondary mb-2  text-start">Get in Touch</h3>
      <p className="text-gray-600 mb-6 text-left max-w-md">
        Feel free to reach out if you have any questions.
      </p>
      <div className="space-y-6 mb-8 text-left">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-3 rounded-full">
            <FiMail className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-secondary">Email Us</p>
            <p className="text-sm text-gray-800 break-all">ttaskflow@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-primary p-3 rounded-full">
            <FiPhone className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-secondary">Call Us</p>
            <p className="text-sm text-gray-800">+855 123 456 78</p>
          </div>
        </div>
      </div>
      <div className="mt-40 text-left">
        <p className="font-semibold mb-6 text-primary text-xl">Follow our social media</p>
        <div className="flex gap-3 flex-wrap">
          <div className="bg-primary p-3 rounded-full">
            <Instagram className="text-white w-7 h-7 cursor-pointer hover:scale-110 transition" />
          </div>
          <div className="bg-primary p-3 rounded-full">
            <Facebook className="text-white w-7 h-7 cursor-pointer hover:scale-110 transition" />
          </div>
          <div className="bg-primary p-3 rounded-full">
            <Twitter className="text-white w-7 h-7 cursor-pointer hover:scale-110 transition" />
          </div>
          <div className="bg-primary p-3 rounded-full">
            <Github className="text-white w-7 h-7 cursor-pointer hover:scale-110 transition" />
          </div>
        </div>
      </div>
    </div>

    {/* Right Side: Form */}
    <div className="flex-1 p-5 w-full">
      <div className="w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
        <h3 className="text-2xl font-bold text-secondary mb-6">Send us a message</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-3 border ${
                  errors.name ? "border-red-600" : "border-gray-300"
                } rounded-lg bg-gray-50`}
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
            </div>
            <div className="flex-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border ${
                  errors.email ? "border-red-600" : "border-gray-300"
                } rounded-lg bg-gray-50`}
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>
          </div>
          <div className="mb-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.phone ? "border-red-600" : "border-gray-300"
              } rounded-lg bg-gray-50`}
            />
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.subject ? "border-red-600" : "border-gray-300"
              } rounded-lg bg-gray-50`}
            />
            {errors.subject && <p className="text-red-600 text-sm">{errors.subject}</p>}
          </div>
          <div className="mb-6">
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.message ? "border-red-600" : "border-gray-300"
              } rounded-lg bg-gray-50 resize-none`}
            ></textarea>
            {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary font-semibold transition"
          >
            Send
          </button>
        </form>
        {success && <p className="text-green-600 font-semibold mt-4">{success}</p>}
      </div>
    </div>
  </div>
</section>
     {/* Mentors Section */}
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12 text-primary">Our Mentors</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {mentors.map((mentor, index) => (
        <div key={index} className="bg-gradient-to-br from-gray-100 to-blue-50 rounded-xl  p-8 hover:shadow-xl transition-all duration-300 ">
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-6">
            {/* Mentor Image with better styling */}
            <div className="relative mb-4 sm:mb-0 sm:mr-6">
              <div className="w-24 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-blue-800 shadow-lg">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    // Show fallback
                    const fallback = e.target.parentElement.querySelector('.fallback-initials');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder */}
                <div className="fallback-initials w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-full items-center justify-center text-2xl font-bold text-gray-700 hidden">
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{mentor.name}</h3>
              <p className="text-gray-600 mt-1">{mentor.expertise}</p>
              <span className="inline-block bg-primary text-white text-sm px-4 py-1 rounded-full mt-2 font-medium">
                {mentor.role}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200 group">
              <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                <FaGithub className="w-5 h-5 text-primary" />
              </span>
              <a 
                href={`https://${mentor.github}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                {mentor.github}
              </a>
            </div>
            
            <div className="flex items-center text-gray-700 hover:text-secondary transition-colors duration-200 group">
              <span className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors">
                <FiMail className="w-5 h-5 text-secondary" />
              </span>
              <a 
                href={`mailto:${mentor.email}`}
                className="font-medium hover:underline"
              >
                {mentor.email}
              </a>
            </div>
            
            <div className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200 group">
              <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                <FaLinkedin className="w-5 h-5 text-primary" />
              </span>
              <a 
                href={`https://${mentor.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                {mentor.linkedin}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Team Members Section */}
      <section className="container mx-auto px-4 text-center py-30 ">
        <h2 className="text-3xl font-bold text-primary mb-10">Team Members</h2>
        <div className="grid grid-cols-1 mt-30 sm:grid-cols-2 gap-20 justify-items-center">
          {members.map((member, i) => (
            <div
              key={i}
              className="relative bg-gray-100 rounded-xl p-6 text-left w-full max-w-md"
            >
              {/* Top Badge */}
              <div className="absolute -top-3 left-0 bg-primary text-white px-4 py-1 rounded-tr-xl rounded-bl-xl">
                <h3 className="font-semibold text-sm">{member.name}</h3>
                <p className="text-xs opacity-80">{member.role}</p>
              </div>
              {/* Quote */}
              <p className="mt-10 italic text-gray-800">“ {member.quote} ”</p>
              {/* Icons */}
              <div className="flex gap-4 mt-6 text-xl text-primary">
                <a href={member.github} target="_blank" rel="noreferrer">
                  <FaGithub className="hover:scale-110 transition-transform" />
                </a>
                <a href={member.email} target="_blank" rel="noreferrer">
                  <FiMail className="hover:scale-110 transition-transform" />
                </a>
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin className="hover:scale-110 transition-transform" />
                </a>
              </div>
              {/* Profile Pic */}
              <div className="absolute -top-12 -right-1 w-24 h-24 rounded-full overflow-hidden border-2 border-orange-500 shadow-md">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
