import { prisma } from '@/lib/prisma'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

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

export default async function CampaignsPage() {
  const campaigns = await getCampaigns()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Browse Campaigns</h1>
            <Link
              href="/campaigns/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Campaign
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/campaigns/${campaign.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Beneficiary:</span>
                    <span className="font-medium">{campaign.beneficiary}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Goal:</span>
                    <span className="font-semibold">${campaign.goal}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Raised:</span>
                    <span className="font-semibold">${campaign.currentAmount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(campaign.currentAmount / campaign.goal) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Created by:</span>
                    <span className="font-medium">{campaign.group.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-500">Card Rates:</span>
                    <span className="font-medium">
                      ${campaign.yellowCardRate} yellow, ${campaign.redCardRate} red
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 