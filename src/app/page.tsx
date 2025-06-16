import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getCampaigns() {
  const campaigns = await prisma.campaign.findMany({
    include: {
      group: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return campaigns
}

export default async function Home() {
  const campaigns = await getCampaigns()

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
            {campaigns.map((campaign) => (
              <Link 
                key={campaign.id} 
                href={`/campaigns/${campaign.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                <p className="text-gray-600 mb-4">
                  ${campaign.yellowCardRate} per yellow card, ${campaign.redCardRate} per red card
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Goal:</span>
                    <span className="font-semibold">${campaign.goal}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Raised:</span>
                    <span className="font-semibold">${campaign.currentAmount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Cards:</span>
                    <span className="font-semibold">
                      {campaign.yellowCards} yellow, {campaign.redCards} red
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Created by {campaign.group.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 