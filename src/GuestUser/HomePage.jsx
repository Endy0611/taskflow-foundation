import React from "react";
import NavbarB4Login from "../components/nav&footer/NavbarB4Login";

const GuestHomePage = () => {
  return (
    <>
   
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-orange-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Stay on top of your to-dos
                <br />
                <span className="text-blue-600">
                  capture, organize, and get
                </span>
                <br />
                them done from anywhere.
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Escape the clutter and chaos unleash your productivity with
                TaskFlow
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-blue-100 rounded-2xl p-8 relative">
                <div className="flex items-center justify-center">
                  <div className="bg-orange-400 rounded-full w-32 h-32 flex items-center justify-center relative">
                    <span className="text-white text-2xl font-bold">⏰</span>
                    <div className="absolute -top-4 -left-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                      ✓
                    </div>
                  </div>
                  <div className="ml-8">
                    <div className="bg-white rounded-lg p-4 shadow-lg mb-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                        <span className="text-sm font-medium">
                          Task completed
                        </span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                        <span className="text-sm font-medium">In progress</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productivity Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 mb-8 lg:mb-0">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Your productivity powerhouse
                </h2>
                <p className="text-gray-600 mb-8">
                  Get done-effortlessly with Boards and Planner Keep every task
                  organized and every project moving forward with TaskFlow
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Do To</h3>
                    <p className="text-sm text-gray-600">
                      This is a collection of planned tasks that are to be
                      executed, organized, and tracked to help you stay focused
                      and productive.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      In Progress
                    </h3>
                    <p className="text-sm text-gray-600">
                      Tasks that are currently being executed, with resources
                      allocated and timeframes with ongoing status and progress
                      tracking.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Done</h3>
                    <p className="text-sm text-gray-600">
                      This completed tasks list can explain details of project
                      checklist and lists archived released features.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 lg:pl-12">
                <div className="flex space-x-4">
                  {/* To Do Column */}
                  <div className="flex-1 bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
                      To Do
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium">Design homepage</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium">User research</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium">Create wireframes</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium">Setup development</p>
                      </div>
                    </div>
                  </div>

                  {/* In Progress Column */}
                  <div className="flex-1 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                      In Progress
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium">
                          Frontend development
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium">API integration</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium">Testing phase</p>
                      </div>
                    </div>
                  </div>

                  {/* Done Column */}
                  <div className="flex-1 bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                      Done
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium">Project planning</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium">Team setup</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium">
                          Requirements gathering
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invite Section */}
        <div className="bg-blue-600 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              From message to invite by gmail
            </h2>
            <p className="text-blue-100 mb-12">
              Quickly turn conversations into your favorite apps and launch,
              keeping all your deliverables and tasks organized in one place.
            </p>

            <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-6 lg:mb-0">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Invite by Gmail
                  </h3>
                  <ul className="text-left text-sm text-gray-600 space-y-2">
                    <li>
                      • Email conversation on-board with a single email invite
                      sent through Gmail
                    </li>
                    <li>
                      • Instant access - Recipients join your workspace right
                      away by accepting the invitation
                    </li>
                    <li>
                      • Seamless onboarding - All boards, projects, and
                      notifications stay connected to their account
                    </li>
                    <li>
                      • Real-time sync - Team members instantly get access,
                      reducing security permissions with simplified onboarding
                    </li>
                  </ul>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          📧 Gmail Integration
                        </span>
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          👥 Team Invite
                        </span>
                        <button className="bg-green-500 text-white px-3 py-1 rounded text-xs">
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Do more with TaskFlow
              </h2>
              <p className="text-gray-600">
                Customize the way you organize with easy integrations,
                automation, and reporting at your on-line device multiple
                locations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Features</h3>
                <p className="text-sm text-gray-600 mb-4">
                  With TaskFlow, keep all your projects at a glance on the
                  Dashboard, understand upcoming and overdue tasks, monitor
                  project team progress and get more done than ever.
                </p>
                <button className="text-blue-600 font-medium text-sm">
                  TaskFlow Features
                </button>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Templates</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Jumpstart productivity and accelerate project delivery and
                  project planning. Organize by week, assign deadlines, and keep
                  track of outstanding deliverables.
                </p>
                <button className="text-blue-600 font-medium text-sm">
                  Get to know Templates
                </button>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Task Management
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Organize projects from start to finish with boards, tables,
                  timelines and progress and completion. Perfect for tracking
                  your team on the go.
                </p>
                <button className="text-blue-600 font-medium text-sm">
                  See more
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Hear From Our <span className="text-orange-500">Happy Users</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">U</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">User Name</h4>
                      <p className="text-sm text-gray-500">Position, Company</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    "TaskFlow has completely transformed how our team manages
                    projects. The intuitive interface and powerful features make
                    collaboration effortless."
                  </p>
                  <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Development Team Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Development <span className="text-blue-600">team</span>
            </h2>

            <div className="text-center max-w-2xl mx-auto">
              <div className="w-32 h-32 bg-orange-200 rounded-full mx-auto mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-500"></div>
              </div>
              <p className="text-gray-600 mb-6">
                ISTAD is the ideal place for anyone looking to advance their IT
                skills. I highly recommend it because of its supportive
                professors and well-structured curriculum. The subjects taught
                by the competent instructors, using user-friendly, engaging
                methods responsive to the latest technological trends and
                networking events.
              </p>
              <h3 className="font-bold text-gray-900 mb-2">Tep Chekra</h3>
              <p className="text-gray-500 mb-4">Instructor</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                See more
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="w-full bg-gray-100 py-12 px-6 text-center">
          <h2 className="text-2xl text-primary font-bold mb-4">
            Get started with TaskFlow today
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <input
              type="email"
              placeholder="Enter your Email"
              className="px-4 py-2 rounded-lg border w-full sm:w-64"
            />
            <button className="px-6 py-2 bg-primary text-white rounded-lg  transition">
              Sign up · It’s free!
            </button>
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            Enter your Email to see our Feature and make your daily more easy!
          </p>
        </section>
      </div>
    </>
  );
};

export default GuestHomePage;
