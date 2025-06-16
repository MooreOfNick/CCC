import Navigation from '@/components/Navigation'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Charity Card Club</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Charity Card Club is a unique platform that turns soccer's yellow and red cards into opportunities for charitable giving. We believe that even the most challenging moments in sports can be transformed into positive change for communities in need.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  1. <strong>Create a Campaign:</strong> Groups can create fundraising campaigns and set donation rates for yellow and red cards.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  2. <strong>Make Pledges:</strong> Supporters pledge to donate specific amounts for each card received during matches.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  3. <strong>Track Progress:</strong> Monitor the number of cards and total donations in real-time.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  4. <strong>Make a Difference:</strong> All donations go directly to the chosen beneficiary organizations.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-gray-600 leading-relaxed">
                Since our launch, we've helped numerous organizations raise funds through the passion of soccer fans. Our platform has created a new way for sports communities to come together and support causes they care about, turning every card into an opportunity for positive change.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Involved</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Whether you're a soccer club, fan group, or charitable organization, you can join our community and start making a difference today. Create a campaign, make a pledge, or simply spread the word about our mission.
              </p>
              <div className="flex space-x-4">
                <a
                  href="/campaigns/new"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Start a Campaign
                </a>
                <a
                  href="/campaigns"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Browse Campaigns
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 