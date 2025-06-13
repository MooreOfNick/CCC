import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Charity Card Club
            </h1>
            <p className="text-xl mb-8">
              Turn soccer cards into charitable donations. Create campaigns, track cards, and make a difference.
            </p>
            <Link 
              href="/campaigns/new"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Start a Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Campaigns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Campaign cards will be dynamically rendered here */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Sample Campaign</h3>
              <p className="text-gray-600 mb-4">
                $10 per yellow card, $50 per red card
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Goal: $1,000</span>
                <span className="text-sm text-gray-500">Raised: $500</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 