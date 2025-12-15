"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PageNavbar } from "@/components/navigation/page-navbar"
import { Footer } from "@/components/navigation/footer"
import { MapPin, Calendar, Clock, Users, Camera, ChevronRight } from "lucide-react"

type Step = 1 | 2 | 3 | 4 | 5

export default function NewBookingPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState({
    serviceType: "general",
    location: "",
    date: "",
    time: "",
    duration: "2",
    cleaners: "1",
    preferences: "",
    photos: [] as string[],
  })

  const steps = [
    { number: 1, title: "Service Type", description: "Choose your cleaning service" },
    { number: 2, title: "Location & Date", description: "When and where you need us" },
    { number: 3, title: "Details", description: "Customize your cleaning" },
    { number: 4, title: "Review", description: "Confirm your booking" },
    { number: 5, title: "Payment", description: "Secure payment" },
  ]

  const serviceTypes = [
    { id: "general", name: "General Cleaning", desc: "Regular home/office cleaning", icon: "🧹" },
    { id: "specialized", name: "Specialized Cleaning", desc: "Pools, windows, gardens", icon: "💧" },
    { id: "professional", name: "Professional Cleaning", desc: "Deep cleaning services", icon: "✨" },
    { id: "event", name: "Event Cleaning", desc: "Before/after event cleaning", icon: "🎉" },
  ]

  const frequencies = [
    { id: "once", name: "One Time" },
    { id: "weekly", name: "Weekly" },
    { id: "monthly", name: "Monthly" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PageNavbar />

      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Steps */}
          <div className="mb-12">
            <div className="flex justify-between mb-4">
              {steps.map((step) => (
                <div key={step.number} className="flex-1 px-2">
                  <div
                    className={`h-2 rounded-full transition-colors ${
                      step.number <= currentStep ? "bg-primary" : "bg-border"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-primary">
                Step {currentStep} of {steps.length}
              </p>
              <h1 className="text-3xl font-bold text-foreground mt-2">{steps[currentStep - 1].title}</h1>
              <p className="text-muted mt-1">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border border-border p-8 shadow-sm mb-8">
            {/* Step 1: Service Type */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setFormData({ ...formData, serviceType: service.id })}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        formData.serviceType === service.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <h3 className="font-bold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted mt-1">{service.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Location & Date */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                    <input
                      type="text"
                      placeholder="Enter your address"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                      <input
                        type="time"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Frequency</label>
                  <div className="grid grid-cols-3 gap-3">
                    {frequencies.map((freq) => (
                      <button
                        key={freq.id}
                        className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all font-medium text-sm text-foreground"
                      >
                        {freq.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                      <select className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white">
                        <option>1 hour</option>
                        <option selected>2 hours</option>
                        <option>3 hours</option>
                        <option>4 hours</option>
                        <option>Full day</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Number of Cleaners</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                      <select className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white">
                        <option selected>1 cleaner</option>
                        <option>2 cleaners</option>
                        <option>3 cleaners</option>
                        <option>4+ cleaners</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Special Preferences</label>
                  <textarea
                    placeholder="Any specific areas, allergies, or preferences?"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
                    value={formData.preferences}
                    onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Upload Photos (Optional)</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                    <Camera size={32} className="mx-auto text-muted mb-2" />
                    <p className="font-medium text-foreground">Click to upload photos</p>
                    <p className="text-sm text-muted">or drag and drop</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-start pb-4 border-b border-border">
                    <div>
                      <p className="text-sm text-muted">Service Type</p>
                      <p className="font-semibold text-foreground">General Cleaning</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start pb-4 border-b border-border">
                    <div>
                      <p className="text-sm text-muted">Location</p>
                      <p className="font-semibold text-foreground">{formData.location}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start pb-4 border-b border-border">
                    <div>
                      <p className="text-sm text-muted">Date & Time</p>
                      <p className="font-semibold text-foreground">
                        {formData.date} at {formData.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted">Estimated Cost</p>
                      <p className="text-2xl font-bold text-accent">45 BHD</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Payment */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h2 className="text-2xl font-bold text-green-900 mb-2">Payment Received!</h2>
                  <p className="text-green-800">Your booking has been confirmed. A cleaner will be assigned shortly.</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>✓ Cleaner will be assigned within 2 hours</li>
                    <li>✓ You'll receive a notification with cleaner details</li>
                    <li>✓ Real-time tracking available 30 minutes before arrival</li>
                    <li>✓ Chat support available throughout the service</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-4 justify-between">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1) as Step)}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button size="lg" onClick={() => setCurrentStep(Math.min(5, currentStep + 1) as Step)} className="gap-2">
              {currentStep === 5 ? "Complete" : "Continue"}
              {currentStep < 5 && <ChevronRight size={20} />}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
