import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

async function getCampaignAndPledge(campaignId: string) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    include: {
      group: true,
      pledges: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    }
  })

  if (!campaign) {
    notFound()
  }

  return campaign
}

export default async function ThankYouPage({ params }: { params: { id: string } }) {
  const campaign = await getCampaignAndPledge(params.id)
  const latestPledge = campaign.pledges[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Pledge!</h1>
              <p className="text-gray-600">
                Your support means a lot to {campaign.beneficiary}
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campaign:</span>
                    <span className="font-medium">{campaign.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Beneficiary:</span>
                    <span className="font-medium">
                      {campaign.beneficiaryUrl ? (
                        <a
                          href={campaign.beneficiaryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {campaign.beneficiary}
                        </a>
                      ) : (
                        campaign.beneficiary
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created by:</span>
                    <span className="font-medium">{campaign.group.name}</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Pledge Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">
                      {latestPledge.isAnonymous ? 'Anonymous' : latestPledge.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Yellow Card Rate:</span>
                    <span className="font-medium">${latestPledge.yellowCardRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Red Card Rate:</span>
                    <span className="font-medium">${latestPledge.redCardRate}</span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  We'll keep you updated on the campaign's progress. Thank you for your generosity!
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    href={`/campaigns/${campaign.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    View Campaign
                  </Link>
                  <Link
                    href="/campaigns"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Browse Other Campaigns
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 