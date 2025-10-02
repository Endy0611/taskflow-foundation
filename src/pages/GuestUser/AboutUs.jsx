// src/pages/AboutUs.jsx
import React, { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";

const AboutUs = () => {
  // ======= Form State =======
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  // ======= Mentor Data =======
  // (Removed unused mentors variable)

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
    <div className="space-y-20 bg-white dark:bg-gray-900 transition-colors duration-300 lg:py-20">
      {/* About Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              About <span className="text-primary">TaskFlow</span>
            </h1>
            <p className="text-gray-600 font-bold dark:text-gray-300 text-lg leading-relaxed">
              TaskFlow{" "}
              <span className="font-normal">
                {" "}
                was founded with the belief that planning should never be
                overwhelming. It started as a simple idea to help individuals or
                teams track daily tasks more effectively.
              </span>
            </p>
          </div>
          <div className="flex-1">
            <img
              src="/src/assets/home/about1.png"
              alt="Team collaboration"
              className="bg-white dark:bg-gray-900 w-full"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <img
              src="/src/assets/home/about2.png"
              alt="Mission illustration"
              className="w-full max-w-md mx-auto "
            />
          </div>
          <div className="flex-1">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-bold">
              TaskFlow's{" "}
              <span className="font-normal">
                vision is to make work organization simple, visual, and powerful
                for everyone. We aim to create a platform where individuals and
                teams can efficiently manage their workflows, enabling them to
                focus on what truly matters: getting things done and achieving
                success.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 py-16 px-6 lg:px-12 border border-purple-800 dark:border-white lg:mx-24">
        {/* Content Wrapper */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Contact Us
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Get in Touch */}
            <div className="flex-1 relative p-[2px] rounded-2xl bg-gradient-to-r from-blue-600 via-orange-600 to-red-500 shadow-xl hover:shadow-2xl transition">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 h-full">
                <h3 className="text-2xl font-bold text-secondary dark:text-white mb-6">
                  Get in Touch
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Feel free to reach out if you have any questions or need
                  assistance.
                </p>

                {/* Contact Details */}
                <div className="space-y-6 mb-8">
                  {/* Email */}
                  <div className="flex items-center gap-4 group">
                    <div className="bg-primary p-3 rounded-xl  group-hover:scale-110 transition">
                      <FiMail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Email Us
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        taskflow@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 group">
                    <div className="bg-primary p-3 rounded-xl group-hover:scale-110 transition">
                      <FiPhone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Call Us
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        +855 12 345 78
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <p className="font-semibold mb-3 text-gray-800 dark:text-gray-200 mt-25">
                    Follow our social media
                  </p>
                  <div className="flex gap-4 mt-5">
                    <FaFacebook className="text-primary w-6 h-6 cursor-pointer hover:scale-125 transition" />
                    <FaTwitter className="text-primary w-6 h-6 cursor-pointer hover:scale-125 transition" />
                    <FaLinkedin className="text-primary w-6 h-6 cursor-pointer hover:scale-125 transition" />
                    <FaInstagram className="text-primary w-6 h-6 cursor-pointer hover:scale-125 transition" />
                  </div>
                </div>
              </div>
            </div>

            {/* Send Message Form */}
            <div className="flex-1 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-secondary mb-6">
                Send us a message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Wave Background */}
        <div className="absolute inset-0 -z-01">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#cbd5f7"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,149.3C672,149,768,171,864,165.3C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary m-30">Our Mentors</h2>

        <div className="space-y-16 md:space-y-25 max-w-6xl mx-auto ">
          {/* Mentor 1 */}
          <div className="flex flex-col md:flex-row rounded-3xl shadow-xl">
            {/* Image Side */}
            <div className="relative md:w-1/2 bg-primary flex justify-center items-end rounded-tl-3xl">
              <img
                src="src/assets/About/cher chhaya.png"
                alt="Mr. Chan Chhaya"
                className="w-52 sm:w-60 md:w-72 object-contain relative md:absolute md:bottom-0"
              />
            </div>

            {/* Info Side */}
            <div className="md:w-1/2 bg-gray-50 dark:bg-gray-800 p-8 text-left flex flex-col justify-center rounded-br-3xl">
              <h3 className="text-2xl font-semibold text-primary dark:text-white">
                Mr. Chan Chhaya
              </h3>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Offer support in Java & API
              </p>
              <p className="mt-2 text-primary text-lg dark:text-gray-300 font-medium">
                Mentor
              </p>

              <div className="mt-4 space-y-4">
                <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaGithub className="text-primary w-6 h-6" />
                  <a
                    href="https://github.com/it-chhaya"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/it-chhaya
                  </a>
                </p>
                <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FiMail className="text-primary w-6 h-6" />
                  <a href="mailto:it.chhaya@gmail.com">it.chhaya@gmail.com</a>
                </p>
                <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaLinkedin className="text-primary w-6 h-6" />
                  <a
                    href="https://www.linkedin.com/in/chan-chhaya"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.linkedin.com/in/chan-chhaya
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Mentor 2 */}
          <div className="flex flex-col md:flex-row-reverse rounded-3xl shadow-xl">
            {/* Image Side */}
            <div className="relative md:w-1/2 bg-primary flex justify-center items-end rounded-tr-3xl">
              <img
                src="src/assets/About/cher cheat.png"
                alt="Ms. Srong Sokcheat"
                className="w-52 sm:w-60 md:w-72 object-contain relative md:absolute md:bottom-0"
              />
            </div>

            {/* Info Side */}
            <div className="md:w-1/2 bg-gray-50 dark:bg-gray-800 p-8 text-left flex flex-col justify-center rounded-bl-3xl">
              <h3 className="text-2xl font-semibold text-primary dark:text-blue-400">
                Ms. Srong Sokcheat
              </h3>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Offer support in Web Design
              </p>
              <p className="mt-2 text-primary text-lg dark:text-gray-300 font-medium">
                Mentor
              </p>

              <div className="mt-6 space-y-4">
                <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaGithub className="text-primary w-6 h-6" />
                  <a
                    href="https://github.com/Sokcheatsrorng"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/Sokcheatsrorng
                  </a>
                </p>
                <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FiMail className="text-primary w-6 h-6" />
                  <a href="mailto:sokcheat@email.com">sokcheat@email.com</a>
                </p>
                <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaLinkedin className="text-primary w-6 h-6" />
                  <a
                    href="https://www.linkedin.com/in/srorng-sokcheat"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.linkedin.com/in/srorng-sokcheat
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary m-30">Team Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 justify-items-center">
          {members.map((member, i) => (
            <div
              key={i}
              className="relative bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 text-left w-full max-w-md transition hover:shadow-md"
            >
              {/* Top Badge */}
              <div className="absolute -top-3 left-0 bg-primary text-white px-4 py-1 rounded-tr-xl rounded-bl-xl">
                <h3 className="font-semibold text-sm">{member.name}</h3>
                <p className="text-xs opacity-80">{member.role}</p>
              </div>

              {/* Quote */}
              <p className="mt-10 italic text-gray-700 dark:text-gray-300">
                “ {member.quote} ”
              </p>

              {/* Icons */}
              <div className="flex gap-4 mt-8 text-2xl text-primary">
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
